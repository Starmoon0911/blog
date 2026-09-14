# Frontend Design Skills

This repository contains 21 opinionated web design skills from 12 sources.
Skills are located in the `skills-src/` directory — each contains a `SKILL.md` with instructions.

## Available Skill Categories

- **Meta**: `webdesign-review` — comprehensive design review orchestrating all domains
- **Core Design**: `ui-design`, `ux-design` — layout, grids, hierarchy, IA, interaction
- **Detail**: `web-typography`, `color-theory`, `accessibility` — fonts, color, WCAG/BFSG
- **Implementation**: `usability`, `responsive-design`, `navigation-design`, `images-media`, `branding-identity`
- **Strategy**: `customer-journey`, `design-process`, `ai-design-workflow`, `landing-pages`, `website-audit`
- **Trends & Patterns**: `design-trends`, `ui-patterns`, `visual-direction`, `component-patterns`, `agent-ui-design`

## Usage

To use a skill, read the `SKILL.md` file in the corresponding `skills-src/<name>/` directory.
For a comprehensive design review, start with `webdesign-review` which orchestrates all domain skills.

# Repository Guidelines

## Project Structure & Module Organization

This Bun workspace contains two applications. `frontend/` is a Next.js 16 and React 19 site: routes live in `frontend/src/app/`, reusable UI in `src/app/components/`, API clients in `src/api/`, and shared helpers in `src/lib/`. Static media belongs in `frontend/public/`.

`backend/` is an Express service. Its entry point is `backend/index.ts`; organize server code by responsibility under `backend/src/` (`route/`, `controller/`, `service/`, `middleware/`, `config/`, and `utils/`). Keep backend tests adjacent to the code they exercise in `__tests__/` directories.

## Build, Test, and Development Commands

- `bun install` installs all workspace dependencies.
- `bun run dev:frontend` starts the Next.js development server.
- `bun run dev:backend` starts the API with file watching.
- `bun run build:frontend` creates a production frontend build.
- `bun run lint` runs ESLint for the frontend.
- `bun --filter backend test` runs backend Vitest tests once; add `test:watch` for watch mode.
- `bun run check-format` verifies Prettier formatting; `bun run format` applies it.

## Coding Style & Naming Conventions

Use TypeScript throughout. Let Prettier manage indentation and formatting; do not hand-format import order because the configured plugin organizes imports. Follow the existing naming: React components use PascalCase (for example, `GeneralPanel.tsx`), utilities use camelCase (`validate.ts`), and backend middleware/services use descriptive lower camel-case filenames. Keep route handlers thin and move validation, business rules, and Supabase access to their respective layers.

## Testing Guidelines

Backend tests use Vitest and Supertest. Name test files `*.test.ts` and place them in the closest `__tests__/` directory, such as `backend/src/middleware/__tests__/auth.test.ts`. Test public behavior, validation failures, authorization, and error responses when changing server logic. Run the relevant test suite before opening a pull request.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style subjects, consistent with the history: `chore: consolidate frontend and backend into monorepo`. Prefer types such as `feat`, `fix`, `refactor`, `test`, and `docs`. Pull requests should explain the user-facing change, list verification commands, link the related issue when available, and include screenshots or recordings for frontend changes.

## Configuration & Security

Copy the relevant `.env.example` before local development. Never commit real credentials, Supabase keys, or generated environment files. Validate new environment values in `backend/src/config/env.ts`.
