# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**CallCalendar** — FastAPI backend. All Python source lives under `server/src/`. Run all commands from that directory.

## Commands

All commands run from `server/src/` using `uv`:

```bash
# Install dependencies
uv sync --all-groups

# Run the app
uv run uvicorn backend.main:app --reload

# Run all tests
uv run pytest -v

# Run a single test file
uv run pytest -v tests/test_foo.py

# Run tests with coverage
uv run pytest -v --cov=backend

# Lint
uv run ruff check .

# Format
uv run ruff format .

# Type check
uv run zuban
```

## Architecture

The backend follows a layered architecture (hexagonal/clean):

- `backend/domain/` — pure domain models and business logic, no framework dependencies
- `backend/service_layer/` — application use cases / services, orchestrates domain objects
- `backend/infrastructure/` — DB (SQLAlchemy + asyncpg), external integrations, entrypoints such as FastAPI app, Celery app, GraphQL app, etc
- `backend/` — FastAPI app, routes, DI wiring via `dishka`

Dependency injection is handled by **dishka**. Database access is async (asyncpg + SQLAlchemy async session). Migrations are managed with **Alembic**.

## Code Style

- `ruff` enforces style: single quotes, 79-char line length, `select = ["ALL"]` with targeted ignores
- `zuban` (wraps pyright) in strict mode — all code must be fully typed
- isort is configured via ruff: known first-party packages are `domain`, `infrastructure`, `service_layer`, `core`
- Tests use `pytest-asyncio` with `asyncio_mode = "auto"` — no `@pytest.mark.asyncio` needed
