from app.core.database import Base
import uuid 
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Boolean, Float 
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import Mapped, mapped_column

class Medicine(Base):
    __tablename__ = "medicines"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    generic_name: Mapped[str] = mapped_column(String(500), index=True, nullable=False)
    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True
    )
    manufacturer: Mapped[str | None] = mapped_column(String(255), nullable=True)
    
    primary_use: Mapped[list[str]] = mapped_column(
        ARRAY(String),
    )
    dosage: Mapped[str] = mapped_column(
        String(255),
    )
    mrp: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )
    prescription_required: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )