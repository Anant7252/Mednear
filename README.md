# MedNear 💊
> **Hyperlocal Medicine Discovery & 30-Minute Pharmacy Reservation Platform**

[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_52-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-Geospatial-green?style=for-the-badge)](https://postgis.net/)
[![TailwindCSS](https://img.shields.io/badge/NativeWind-TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📌 Problem Statement

During medical emergencies or sudden illnesses, patients and caregivers face severe friction finding urgent medicines offline:
1. **Physical Store-Hopping:** Visiting 3–5 chemist shops late at night only to discover a critical drug is out of stock.
2. **Slow Quick-Commerce Delivery:** Standard 10-minute grocery delivery apps rarely carry specialized prescription drugs, while traditional online pharmacies take 24–48 hours to deliver.
3. **No Stock Holding Guarantee:** Calling a pharmacy doesn't guarantee the medicine won't be sold to a walk-in customer before you arrive.

**MedNear solves this** by indexing real-time medicine availability across offline neighborhood pharmacies and introducing a **30-Minute Guaranteed Hold** feature, letting patients lock medicines at a nearby chemist before stepping out of their home.

---

## ✨ Key Features

- **📍 Hyperlocal Geo-Pharmacy Engine:** PostGIS-powered geospatial distance matching (`ST_DWithin`) finds licensed chemists stocking your medicine within 0.5 km to 5 km radius.
- **⏱️ 30-Minute Guaranteed Hold:** One-tap reservation locks the drug on the chemist's shelf for 30 minutes, preventing walk-in stockouts while you travel to the pharmacy.
- **🔍 Intelligent Salt & Brand Search:** Search by brand name (e.g., *Dolo 650*, *Augmentin 625*) or active pharmacological chemical salt (*Paracetamol*, *Amoxycillin*) with generic alternative suggestions.
- **🛡️ Rx Compliance & Prescription Verification:**
  - **OTC Safe:** Instant reservation for over-the-counter medicines (Paracetamol, Antacids, vitamins).
  - **Rx Required:** Blocking prescription verification workflow ensuring strict regulatory compliance for Scheduled/antibiotic medications.
- **💎 Liquid-Glass iOS/Android Design System:**
  - Custom floating translucent bottom dock with dynamic water droplet physics and single-corner meniscus shrink around elevated action buttons.
  - 3D Floating Dual-tone Capsule search loader with optical ground contact shadows and spring physics.
  - Ambient mint gradient diffusions and responsive curved corner card layouts.

---

## 🏗️ System Architecture

```
                                  ┌────────────────────────┐
                                  │   MedNear Mobile App   │
                                  │ (Expo / React Native)  │
                                  └───────────┬────────────┘
                                              │ HTTPS / REST
                                              ▼
                                  ┌────────────────────────┐
                                  │    FastAPI Gateway     │
                                  │   (Python 3.12 Async)  │
                                  └───────────┬────────────┘
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
                │   Auth & JWT    │  │ Medicine Search │  │  Geo-Pharmacy   │
                │     Module      │  │    & Details    │  │ PostGIS Engine  │
                └─────────────────┘  └─────────────────┘  └─────────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │  PostgreSQL + PostGIS  │
                                  │  (Geo Index / Spatial) │
                                  └────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or newer)
- [Python](https://www.python.org/) (v3.11 or v3.12)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for PostgreSQL + PostGIS)
- [Expo Go](https://expo.dev/go) app on your mobile device (iOS or Android)

---

### 1. Database & Backend Setup

```powershell
# 1. Clone repository
git clone https://github.com/Anant7252/MedNear.git
cd MedNear/server

# 2. Start PostgreSQL with PostGIS extension via Docker
docker-compose up -d

# 3. Create and activate a Python virtual environment
python -m venv venv
.\venv\Scripts\activate   # On Windows
# source venv/bin/activate  # On macOS/Linux

# 4. Install dependencies
pip install -r requirements.txt

# 5. Configure environment variables (.env in server/)
# DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/mednear
# SECRET_KEY=your-super-secret-jwt-key
# ALGORITHM=HS256

# 6. Seed medicine catalog & start development server
python -m scripts.import_medicines
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The interactive API documentation is accessible at **`http://localhost:8000/docs`** (Swagger UI).

---

### 2. Mobile App Setup

```powershell
# 1. Navigate to mobile app directory
cd ..\app

# 2. Install Node dependencies
npm install

# 3. Start Expo development server
npx expo start
```

- Press **`w`** in the terminal to run in your Web browser.
- Press **`a`** to launch on an Android emulator or scan the QR code with **Expo Go** on a physical phone.

---

## 🛡️ Security & Quality Standards

- **Strict Zero Secrets in Version Control:** Environment secrets (`.env`) are strictly untracked via multi-tiered `.gitignore`.
- **Type Safety:** 100% strict TypeScript on mobile frontend and Pydantic v2 validation on backend models.
- **Asynchronous I/O:** Fully asynchronous database querying with `SQLAlchemy 2.0` and `asyncpg` for high throughput under concurrent load.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](app/LICENSE) file for details.

---

## 👨‍💻 Author

**Anant Tripathi**  
- GitHub: [@Anant7252](https://github.com/Anant7252)  
- Project: [https://github.com/Anant7252/MedNear](https://github.com/Anant7252/MedNear)
