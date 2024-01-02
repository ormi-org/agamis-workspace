FROM debian:12-slim

LABEL org.openrichmedia="The Open Rich Media Initiative"
LABEL name="agamis-workspace-ci:0124"
LABEL version="0124"
LABEL description="An image for ci environment packed with Node 18, PNPM, Git"

ARG NODEJS_VERSION=18
ARG SHELL=/bin/bash

# Install JDK & dependencies
RUN apt update && apt install -y ca-certificates curl gnupg git
# Install NODE
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODEJS_VERSION.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt update && apt install nodejs -y
# Install PNPM
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install Cypress dependencies
RUN apt update && apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb