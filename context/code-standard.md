# Code Standards — Portfolio

## General

- Keep files small and focused. One responsibility per file.
- Do not mix UI and business logic — components render, they don't fetch, transform, or validate.
- Fix root causes, not symptoms. No patching over a bug at the call site if the fix belongs upstream.

## TypeScript

- Strict mode required.
- No `any`. Use `unknown` + narrowing if a type is genuinely not known yet.
- Use `interface` for data contracts (props, API payloads, CMS content shapes).
- Prefer explicit return types on exported functions.

## API Routes (`app/api/`)

- Validate all inputs with Zod — request bodies, query params, and CMS webhook payloads alike.
- Keep route handlers thin: parse → validate → call a service function → return response.
- Return typed, consistent error shapes (e.g. `{ error: string }`) with correct HTTP status codes.
- Rate-limit or otherwise protect any public-facing endpoint (contact form, newsletter signup) from abuse.

## Architecture Rules

- Flow: `app/api/route.ts` → `services/` (business logic) → `lib/` or `repositories/` (data access — CMS client, email provider, etc.).
- No direct third-party API calls (CMS SDK, email SDK) from route handlers — wrap them in a service.
- Server Components fetch data via services, not by calling `fetch()` on your own API routes internally.

## Contact Form & Email

- Never trust client-submitted status as confirmation — only a successful server-side send (or provider webhook, if using one) counts as "sent."
- Sanitize and validate all form fields server-side, even though Zod already validates shape.
- Add basic spam protection (honeypot field and/or rate limiting) — don't rely on the client to behave.
- Never expose email provider API keys to the client; all sends happen from an API route.

## CMS / Content

- Content shape is defined by a TypeScript interface, not inferred ad hoc at each usage site.
- Don't hardcode content that belongs in the CMS (bio text, project descriptions, links) — hardcode only structural/UI copy.
- Handle missing/optional CMS fields gracefully; don't assume every field is always populated.

## Styling

- Use Tailwind tokens only — no hardcoded hex colors or arbitrary pixel values in class names.
- Glassmorphism effects (blur, translucency, border tokens) live in the design system config (`tailwind.config` theme or a shared `styles/tokens`), not repeated inline per component.
- Shared visual patterns (glass card, section wrapper) become reusable components, not copy-pasted class strings.

## File Structure

- `app/` → routes, layouts, pages (App Router)
- `app/api/` → route handlers only (thin)
- `services/` → business logic (form handling, CMS fetch orchestration)
- `lib/` → external clients/integrations (CMS SDK, email SDK) and low-level utilities
- `components/` → UI only, no data fetching or business logic
- `types/` → shared interfaces (CMS content, API contracts)
