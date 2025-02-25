FROM node:22-alpine AS base

LABEL authors="Survey Bot Webapp" \
      org.label-schema.vendor="H3llo.Cloud" \
      org.label-schema.description="" \
      org.label-schema.schema-version="1.0"

ENV USER="app" \
    BUILD_DEPS="yarn git" \
    NODE_OPTIONS="--max_old_space_size=2048" \
    NODE_ENV="production"

RUN set -x && \
    apk add --no-cache --virtual build_deps $BUILD_DEPS && \
    addgroup -g 2000 $USER && \
    adduser -u 2000 -G $USER -s /bin/sh -D $USER && \
    corepack yarn

RUN yarn set version 4.6.0 && \
    yarn config set nodeLinker node-modules

WORKDIR /home/$USER
USER $USER


FROM base AS deps
# Get dependencies config
COPY --chown=$USER:$USER package*.json yarn.lock ./
# Install all dependencies
RUN yarn workspaces focus --all


# -----------
# Build image
FROM deps AS build
ENV NODE_ENV="production"
COPY --chown=$USER:$USER . .
RUN yarn build


# -----------
# Serve image for production
FROM deps AS production
ENV NODE_ENV="production"

COPY --from=build --chown=$USER:$USER /home/app/.next ./.next
COPY --from=build --chown=$USER:$USER /home/app/public ./public

RUN yarn workspaces focus --production

# Run the built application
ENTRYPOINT ["yarn", "run", "start"]
