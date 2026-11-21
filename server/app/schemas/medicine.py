import uuid
from pydantic import BaseModel, ConfigDict

class SearchResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    name: str
    generic_name: str
    manufacturer: str | None = None
    dosage: str
    mrp: float | None = None
    image_url: str | None = None
    primary_use: list[str] = []
    prescription_required: bool = False

MedicineResponse = SearchResponse


class PaginatedMedicineResponse(BaseModel):
    items: list[MedicineResponse]
    total: int
    page: int
    limit: int
    has_more: bool

