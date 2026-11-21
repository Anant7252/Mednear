import asyncio
from app.core.database import AsyncSessionLocal
from app.models.medicine import Medicine
from sqlalchemy import select, func

async def verify():
    async with AsyncSessionLocal() as session:
        count = await session.scalar(select(func.count(Medicine.id)))
        priced_count = await session.scalar(select(func.count(Medicine.id)).where(Medicine.mrp.isnot(None)))
        print(f"Total medicines: {count}")
        print(f"Medicines with MRP: {priced_count}")
        
        for q in ["Augmentin", "Azithral", "Ascoril", "Allegra", "Aciloc", "Dolo"]:
            res = await session.execute(
                select(Medicine.name, Medicine.generic_name, Medicine.dosage, Medicine.mrp, Medicine.image_url)
                .where(Medicine.name.ilike(f"%{q}%") | Medicine.generic_name.ilike(f"%{q}%"))
                .limit(2)
            )
            rows = res.fetchall()
            print(f"\nSearch results for '{q}':")
            for r in rows:
                has_img = "Has Image" if r[4] else "No Image"
                print(f" - {r[0]} | Salt: {r[1][:35]} | {r[2]} | MRP: Rs. {r[3]} | [{has_img}]")

if __name__ == "__main__":
    asyncio.run(verify())
