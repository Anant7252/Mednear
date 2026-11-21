import csv
import re
import html
import asyncio
from pathlib import Path
from sqlalchemy import text
from app.core.database import AsyncSessionLocal, engine

PRICE_CSV = Path(__file__).resolve().parent.parent / "data" / "indian_medicine_prices.csv"

def normalize_text(val: str) -> str:
    cleaned = html.unescape(val or "").lower()
    return re.sub(r"[^a-z0-9]", "", cleaned)

async def update_medicine_prices():
    if not PRICE_CSV.exists():
        print(f"Price file not found: {PRICE_CSV}")
        return

    print("Loading price records from dataset...")
    exact_map = {}
    norm_map = {}
    salt_map = {}

    with open(PRICE_CSV, mode="r", encoding="utf-8", errors="ignore") as f:
        reader = csv.DictReader(f)
        for row in reader:
            raw_price = row.get("price(₹)", "").strip()
            if not raw_price:
                continue
            try:
                price = round(float(raw_price), 2)
            except ValueError:
                continue

            name = (row.get("name") or "").strip().lower()
            if name and name not in exact_map:
                exact_map[name] = price

            norm_name = normalize_text(row.get("name") or "")
            if norm_name and norm_name not in norm_map:
                norm_map[norm_name] = price

            comp = normalize_text((row.get("short_composition1") or "") + " " + (row.get("short_composition2") or ""))
            if comp and comp not in salt_map:
                salt_map[comp] = price

    print(f"Built price index with {len(exact_map)} exact names, {len(norm_map)} normalized names, {len(salt_map)} salts.")

    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT id, name, generic_name FROM medicines"))
        rows = result.fetchall()
        total_meds = len(rows)
        print(f"Loaded {total_meds} medicines from database to update.")

        updates = []
        matched_exact = 0
        matched_norm = 0
        matched_salt = 0
        matched_fallback = 0

        for med_id, med_name, generic_name in rows:
            lower_name = (med_name or "").strip().lower()
            norm_name = normalize_text(med_name or "")
            norm_salt = normalize_text(generic_name or "")

            price = None
            if lower_name in exact_map:
                price = exact_map[lower_name]
                matched_exact += 1
            elif norm_name in norm_map:
                price = norm_map[norm_name]
                matched_norm += 1
            elif norm_salt in salt_map:
                price = salt_map[norm_salt]
                matched_salt += 1
            else:
                price = 75.00
                matched_fallback += 1

            updates.append({"id": str(med_id), "mrp": price})

        print(f"Match breakdown: Exact={matched_exact}, Normalized={matched_norm}, Salt={matched_salt}, Fallback={matched_fallback}")

        batch_size = 2000
        for i in range(0, len(updates), batch_size):
            batch = updates[i : i + batch_size]
            values_str = ", ".join(f"('{item['id']}'::uuid, {item['mrp']})" for item in batch)
            sql = f"""
            UPDATE medicines AS m
            SET mrp = v.mrp,
                updated_at = NOW()
            FROM (VALUES {values_str}) AS v(id, mrp)
            WHERE m.id = v.id;
            """
            await session.execute(text(sql))
            await session.commit()
            print(f"Updated {min(i + batch_size, len(updates))} / {len(updates)} medicines...")

    print("All medicine prices successfully updated!")

    async with AsyncSessionLocal() as session:
        sample = await session.execute(
            text("SELECT name, generic_name, dosage, mrp, image_url FROM medicines WHERE mrp IS NOT NULL LIMIT 8")
        )
        print("\n--- SAMPLE VERIFIED MEDICINES WITH PRICES ---")
        for row in sample.fetchall():
            img_status = "Has Image" if row[4] else "No Image"
            print(f"• {row[0]} | Salt: {row[1][:30]} | {row[2]} | MRP: ₹{row[3]} | [{img_status}]")

if __name__ == "__main__":
    asyncio.run(update_medicine_prices())
