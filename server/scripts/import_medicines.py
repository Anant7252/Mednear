import csv
import re
import asyncio
from pathlib import Path
from app.core.database import AsyncSessionLocal
from app.models.medicine import Medicine

CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "Medicine_Details.csv"
BATCH_SIZE = 1000

async def import_medicines():
    if not CSV_PATH.exists():
        print(f"File not found: {CSV_PATH}")
        return

    print(f"Reading {CSV_PATH.name}...")

    medicines_to_insert = []
    
    with open(CSV_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            name = row.get("Medicine Name", "").strip()
            composition = row.get("Composition", "").strip()
            manufacturer = row.get("Manufacturer", "").strip() or None
            image_url = row.get("Image URL", "").strip() or None
            uses_raw = row.get("Uses", "").strip()

            if not name or not composition:
                continue

            uses = (
                [u.strip() for u in uses_raw.split(",") if u.strip()]
                if "," in uses_raw
                else ([uses_raw] if uses_raw else ["General Medical Use"])
            )

            dosage_match = re.search(
                r"(\d+\.?\d*\s*(?:mg|ml|gm|g|mcg|iu|%))",
                composition + " " + name,
                re.IGNORECASE,
            )
            dosage = dosage_match.group(1) if dosage_match else "Standard"

            is_rx = any(
                term in (name + " " + uses_raw + " " + composition).lower()
                for term in [
                    "injection",
                    "bacterial",
                    "cancer",
                    "antibiotic",
                    "cardiac",
                    "steroid",
                    "schedule h",
                ]
            )

            medicine = Medicine(
                name=name,
                generic_name=composition,
                manufacturer=manufacturer,
                image_url=image_url,
                primary_use=uses,
                dosage=dosage,
                prescription_required=is_rx,
            )
            medicines_to_insert.append(medicine)

    total_count = len(medicines_to_insert)
    print(f"Parsed {total_count} valid medicines. Inserting into PostgreSQL in batches of {BATCH_SIZE}...")

    async with AsyncSessionLocal() as session:
        for i in range(0, total_count, BATCH_SIZE):
            batch = medicines_to_insert[i : i + BATCH_SIZE]
            session.add_all(batch)
            await session.commit()
            print(f"Inserted {min(i + BATCH_SIZE, total_count)} / {total_count} records...")

    print("SUCCESS: All medicines imported into PostgreSQL database!")

if __name__ == "__main__":
    asyncio.run(import_medicines())