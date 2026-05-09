# Bakong KHQR Support API

FastAPI backend for the portfolio Support Me section. The frontend never receives the Bakong token; it only calls this backend.

## Local Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Edit `.env` and set:

- `BAKONG_TOKEN`
- `BACKEND_SECRET_KEY`
- production `CORS_ORIGINS`

Run locally:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API

- `POST /api/khqr/create`
- `GET /api/khqr/status/{payment_id}`
- `GET /health`

## Render

Create a Render web service from `render.yaml`, then set `BAKONG_TOKEN` and update `CORS_ORIGINS` to the deployed frontend URL.
