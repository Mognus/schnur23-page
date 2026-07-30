# schnur23-page

Linktree für [schnur23.de](https://schnur23.de). **SvelteKit** (`adapter-node`,
SSR) hinter **Caddy**, das TLS automatisch übernimmt. Angelegt mit Raum für eine
Go-API und Postgres — siehe [Plan.md](Plan.md).

```
Browser ──/──► Caddy ──► web:3000 (SvelteKit SSR)
```

Nur Caddy bindet Ports, `web` bleibt im internen Docker-Netz.

## Dev

```bash
cp .env.example .env
docker compose -f compose.dev.yml up

#   http://localhost:5174   (DEV_PORT, Vite direkt — kein Caddy davor)
```

Der Source-Ordner ist gemountet, HMR läuft nativ.

## Prod

Deploy passiert automatisch: **Push auf `main`** → ein self-hosted Runner baut
und startet den Stack neu (`.github/workflows/deploy.yml`).

```bash
git push origin main
```

Lokal testen lässt sich der Prod-Stack mit:

```bash
docker compose up -d --build   # http://localhost
```

Secrets liegen auf dem Server in `~/schnur23.env`, nie im Repo. Nötig sind dort:

```env
SITE_ADDRESS=schnur23.de
ORIGIN=https://schnur23.de
```

`SITE_ADDRESS` ohne Schema — mit `https://` startet Caddy die ACME-Challenge
nicht. `ORIGIN` muss exakt dem entsprechen, was der Browser sieht, sonst weist
`adapter-node` Form-Actions ab. `WWW_ADDRESS` erst setzen, wenn der
www-DNS-Eintrag existiert.

## Inhalt pflegen

Links und die Geldschein-Optik stehen in
[`frontend/src/lib/links.ts`](frontend/src/lib/links.ts). `href: null` markiert
einen angekündigten Link, der als `// SOON` gerendert wird.
