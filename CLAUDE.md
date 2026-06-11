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

## Development Process

Development follows **TDD**: write a failing test first, then implement the minimum code to make it pass, then refactor.

1. Write a failing test
2. Implement the minimum code to pass it
3. Refactor if needed
4. Commit

Never write implementation code without a corresponding test written first.

## Code Style

- `ruff` enforces style: single quotes, 79-char line length, `select = ["ALL"]` with targeted ignores
- `zuban` (wraps pyright) in strict mode — all code must be fully typed
- isort is configured via ruff: known first-party packages are `domain`, `infrastructure`, `service_layer`, `core`
- Tests use `pytest-asyncio` with `asyncio_mode = "auto"` — no `@pytest.mark.asyncio` needed

---

## typespec/

API contract defined in TypeSpec. Run all commands from `typespec/`.

### Commands

```bash
npm install
tsp compile .
```

Output lands in `typespec/tsp-output/schema/openapi.yaml`.

### Structure

- `models/` — TypeSpec model definitions
- `routes/` — TypeSpec route definitions
- `main.tsp` — entrypoint

---

## ui/

React 18 frontend. Run all commands from `ui/`.

### Commands

```bash
npm install
npm run dev          # dev server at localhost:5173
npm run build        # production build
npm test             # Jest
npm run lint         # ESLint
npm run lint:fix     # ESLint + autofix
npm run generate:api # regenerate types from OpenAPI spec
```

### Architecture

Feature-Sliced Design (FSD). Import direction: `shared` → `entities` → `features` → `widgets` → `pages` → `app`. Never import upward.

Entity slice: `api/` + `model/stores/` + `model/types/` + `index.ts`.
Feature slice: `ui/FeatureName.tsx` + `index.ts`.
Page slice: `ui/PageName.tsx` + `index.ts`.

### Key files

- `src/shared/api/api.ts` — axios instance (`$api`)
- `src/shared/api/config/apiConfig.ts` — base URL, endpoints, timeout
- `src/shared/api/types.generated.ts` — auto-generated, commit after `tsp compile . && npm run generate:api`
- `src/app/providers/StoreProvider/config/RootStore.ts` — aggregates all entity stores
- `src/app/providers/StoreProvider/config/RootStoreContext.ts` — `useStore()` hook

### Code Style

- ESLint v10 flat config, `explicit-function-return-type: error` — `ReactElement` for components
- Single quotes, 4-space indent, semicolons
- `camelCase` for variables/functions, `PascalCase` for types/classes/components/pages
- MobX: `makeAutoObservable`; wrap all post-`await` mutations in `runInAction`
