FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /tests

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npx", "playwright", "test", "--project=e2e-smoke"]


# Base Image (includes all Playwright browsers — no need to install them separately)
# Set the working directory
# Copy package files first to cache node_modules layer
# Install dependencies
# Copy the rest of the project
# Run tests (override with `docker run ... npx playwright test <file>` to target a specific spec)