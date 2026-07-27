# syntax=docker/dockerfile:1

FROM node:26-alpine AS build
WORKDIR /app
RUN npm i -g pnpm@11

# Manifests first: this layer only busts when dependencies change, so source
# edits reuse the cached install.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# adapter-node bundles the server into build/, and every dependency here is
# build-time only — so the runtime image needs no node_modules and no pnpm.
FROM node:26-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
	CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "build"]
