# schnur23-page

Linktree for [schnur23.de](https://schnur23.de). **SvelteKit** (`adapter-node`,
SSR) behind **Caddy**, which handles TLS automatically. Laid out with room to
grow into a Go API plus Postgres — see [Plan.md](Plan.md).

```
Browser ──/──► Caddy ──► web:3000 (SvelteKit SSR)
```

Only Caddy binds ports; `web` stays on the internal Podman network.

## Dev

```bash
cp .env.example .env
podman compose -f compose.dev.yml up

#   http://localhost:5174   (DEV_PORT — Vite directly, no Caddy in front)
```

The source folder is bind-mounted, so HMR works natively.

## Prod

Deploy is automatic: **push to `main`** → a self-hosted runner rebuilds and
restarts the stack (`.github/workflows/deploy.yml`).

```bash
git push origin main
```

To smoke-test the production stack locally:

```bash
podman compose up -d --build   # http://localhost
```

Secrets live on the server in `~/schnur23.env`, never in the repo. Required
there:

```env
SITE_ADDRESS=schnur23.de
ORIGIN=https://schnur23.de
```

`SITE_ADDRESS` takes no scheme — with `https://` Caddy never starts the ACME
challenge. `ORIGIN` must match exactly what the browser sees, otherwise
`adapter-node` rejects form actions. Set `WWW_ADDRESS` only once the www DNS
record exists.

## Editing content

Links and the banknote styling live in
[`frontend/src/lib/links.ts`](frontend/src/lib/links.ts). `href: null` marks an
announced link that renders as `// SOON`.
