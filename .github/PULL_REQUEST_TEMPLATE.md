## Description

<!-- Explain the user-facing change: what does this PR do and why? -->

## Related issues

<!-- Link related issue(s), e.g. `Closes #123` or `Refs #456`. Delete this section if not applicable. -->

Closes #

## Type of change

Use a concise Conventional Commit-style subject for each commit.

- [ ] feat: new feature
- [ ] fix: bug fix
- [ ] refactor: no behavior change
- [ ] test: add or update tests
- [ ] docs: documentation only
- [ ] chore: tooling, dependencies, housekeeping

## Verification

- [ ] `bun run lint`
- [ ] `bun run check-format`
- [ ] `bun --filter backend test` (backend changes)
- [ ] `bun run build:frontend` (frontend changes)
- [ ] Manually tested the affected flows

## Screenshots / recordings

<!-- Required for frontend changes: show before/after or the new behavior. -->

## Notes

- [ ] New environment variables were added and validated in `backend/src/config/env.ts`, and `.env.example` was updated
