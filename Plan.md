# schnur23 — Architecture

Linktree first, room to grow into a small/medium app.

## Stack

- **Caddy** — reverse proxy, automatic TLS
- **SvelteKit** (`adapter-node`) — SSR, acts as BFF
- **Go + chi** — API
- **Postgres**
- Docker Compose, dedicated Hetzner box

## Topology

```
Internet → caddy → web:3000 → api:8080 → db
                   (SSR)      (Go)
```

Only `caddy` binds ports. `web`, `api` and `db` stay on the internal Docker
network — the Go API never faces a browser, so no CORS.

## Go libraries

`chi` (router) · `scs` (sessions) · `bcrypt` · `validator` · `sqlc` (typed
queries) · `golang-migrate` · `tygo` (Go structs → TS types)

Chi stays `net/http`-compatible, so nothing is locked in. If the API grows,
`Huma` sits on top of chi and generates OpenAPI.

## Rules

1. **Node is a BFF, not a proxy.** Fetch in `+page.server.ts`. If it only
   forwards requests, the layer is pointless and `adapter-static` would be
   the better call.
2. **No shared session state in the Node process.** Per-request via
   `event.locals` only.
3. **Go owns auth.** Sets and validates the session cookie; Node passes it
   through.
4. **Types are generated, never hand-written.** Go struct → tygo → TS.

## Gotchas

- `adapter-node` needs `ORIGIN` set, otherwise form actions are rejected.
- Inside containers the API is `http://api:8080`, not localhost.
- Caddy needs a volume on `/data` or it re-issues certs on every restart.

## Open

- Data model — pending mockup
- Admin UI: `/admin` routes in SvelteKit
