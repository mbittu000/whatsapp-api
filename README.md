# WhatsApp API Service

A lightweight WhatsApp API service built with [Hono](https://hono.dev/) and [whatsapp-web.js](https://wwebjs.dev/), optimized for low-memory environments.

## Features

- **QR Code Authentication**: Scan QR code to log in.
- **Message Sending**: Send text messages via API.
- **Session Management**: Logout and restart session support.
- **Low Memory Footprint**: Configured to run efficiently on resource-constrained servers (<500MB RAM).

## Installation

```bash
bun install
```

## Running the Server

```bash
bun run dev
```

The server will start at `http://localhost:3000`.

## API Endpoints

### 1. Check Server Status
**GET** `/`
- Returns: `server is running`

### 2. Get QR Code
**GET** `/qr`
- Returns the current QR code string if not logged in.
- Returns `ready` if already authenticated.

### 3. Check Authentication Status
**GET** `/ready`
- Returns: `ready` or `not ready`

### 4. Send Message
**POST** `/send`
- **Body**:
  ```json
  {
    "number": "1234567890", // Phone number without country code (assumes 91/India by default in code, adjust if needed)
    "message": "Hello World"
  }
  ```
- Returns: `message sent` or error message.

### 5. Logout
**GET** `/logout`
- Logs out the current session.

### 6. Restart Client
**GET** `/restart`
- Restarts the WhatsApp client implementation.

### 7. Get Client Metadata
**GET** `/meta`
- Returns client information/metadata.

## Environment & Configuration

- **Runtime**: Bun
- **Framework**: Hono
- **WhatsApp Library**: whatsapp-web.js (Puppeteer)
