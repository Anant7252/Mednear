from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from app.core.database import get_db
from app.models.medicine import Medicine
from app.schemas.medicine import PaginatedMedicineResponse

router = APIRouter(prefix="/medicines", tags=["Medicines"])

@router.get(
    "/search",
    response_model=PaginatedMedicineResponse,
    status_code=status.HTTP_200_OK,
)
async def search_medicines(
    q: str = Query(..., min_length=1, description="Search by medicine name or generic salt"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=50, description="Items per page"),
    db: AsyncSession = Depends(get_db),
):
    search_filter = or_(
        Medicine.name.ilike(f"%{q}%"),
        Medicine.generic_name.ilike(f"%{q}%"),
    )

    total_query = select(func.count(Medicine.id)).where(search_filter)
    total = await db.scalar(total_query) or 0

    offset = (page - 1) * limit
    items_query = (
        select(Medicine)
        .where(search_filter)
        .order_by(Medicine.name.asc())
        .offset(offset)
        .limit(limit)
    )
    result = await db.execute(items_query)
    items = result.scalars().all()

    has_more = (page * limit) < total

    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "has_more": has_more,
    }