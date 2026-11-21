import enum 
import uuid 
from datetime import datetime,timezone
from sqlalchemy import String ,DateTime,Enum 
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped ,mapped_column

from app.core.database import Base

class UserRole(str,enum.Enum):
    CUSTOMER="customer"
    SHOP_OWNER="shop_owner"
    ADMIN="admin"

class User(Base):
    __tablename__="users"

    id:Mapped[uuid.UUID]=mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    email:Mapped[str]=mapped_column(
        String(255),
        unique=True,
        index=True,    
        nullable=False,
    )

    phone:Mapped[str | None]=mapped_column(
        String(20),
        nullable=True,
    )

    password_hash:Mapped[str]=mapped_column(
        String(255),
        nullable=False,
    )

    role:Mapped[UserRole]=mapped_column(
        Enum(UserRole,name="user_role",create_type=True),
        default=UserRole.CUSTOMER,
        nullable=False,
    )

    created_at:Mapped[datetime]=mapped_column(
        DateTime(timezone=True),
        default=lambda:datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )




