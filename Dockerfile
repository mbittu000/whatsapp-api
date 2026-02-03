# Use the official Bun image
FROM oven/bun:1

WORKDIR /app

# Install dependencies required for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    chromium \
    libgbm1 \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to skip downloading Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Copy package files
COPY package.json bun.lock ./

# Install project dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the server
CMD ["bun", "run", "start"]
