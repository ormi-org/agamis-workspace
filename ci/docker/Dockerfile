FROM debian:12-slim

LABEL org.openrichmedia="The Open Rich Media Initiative"
LABEL name="agamis-workspace-ci:0124"
LABEL version="0124"
LABEL description="An image for ci environment packed with Node 18, PNPM, Git"

ARG NODE_MAJOR=20
ARG SHELL=bash

# Install pre-requisites
RUN apt update
RUN apt install -y ca-certificates curl gnupg git
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Add deb repo for Node
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

# Install NODE
RUN apt update
RUN apt install nodejs -y
RUN npm install -g corepack

# Install PNPM
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install Cypress dependencies
RUN apt update && apt install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb