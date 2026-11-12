# binolabs type: frontend-only Monkeytype build (no backend, no Firebase,
# no captcha, no ads, no analytics). Built from the repo root:
#   docker build -f docker/binolabs/Dockerfile -t binolabs-type .
FROM node:24.22.1-alpine3.23 AS builder
WORKDIR /app

# No backend exists behind this build. Point the API client at a same-origin
# path that nginx answers with 503, so failed calls never leave the site.
ENV BACKEND_URL=/api RECAPTCHA_SITE_KEY=""

COPY ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "turbo.json", "./"]
COPY packages packages
COPY frontend frontend

# Empty Firebase config: firebase.ts skips init when apiKey is blank.
COPY frontend/src/ts/constants/firebase-config-example.ts frontend/src/ts/constants/firebase-config.ts
COPY frontend/src/ts/constants/firebase-config-example.ts frontend/src/ts/constants/firebase-config-live.ts

RUN npm i -g pnpm@11.21.0 && \
    pnpm i --frozen-lockfile && \
    npm run build

# Static GET /api/configuration: upstream's secure-by-default backend config.
COPY backend/src/constants/base-configuration.ts frontend/binolabs/base-configuration.ts
COPY docker/binolabs/export-configuration.ts frontend/binolabs/export-configuration.ts
RUN cd frontend && \
    node_modules/.bin/tsx binolabs/export-configuration.ts dist/api/configuration

FROM nginx:mainline-alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY docker/binolabs/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/binolabs/headers.conf /etc/nginx/snippets/binolabs-headers.conf
COPY NOTICE.md LICENSE /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
