# mTLS Test Site (Node.js)

A minimal Node.js application that demonstrates **mutual TLS (mTLS)** authentication using client certificates.

This project is intended for **testing, learning, and demonstration purposes**.  
It provides a very simple HTTPS server that requires a valid **client certificate** to access the main page.

---

## Features

- HTTPS server built with Node.js and Express
- Mutual TLS (client certificate authentication)
- Fixed certificates and password (deterministic setup)
- Works on Windows environments (including AWS EC2 Windows)
- Minimal setup, no database, no external dependencies

---

## How It Works

- The server runs over **HTTPS (port 443)**.
- A custom Certificate Authority (CA) is used.
- The server **requires** a valid client certificate signed by the same CA.
- If the client certificate is valid, the server responds with a simple test page.
- If not, the TLS handshake fails or a 401 response is returned.

---

## Requirements

- Node.js (LTS recommended)
- npm
- OpenSSL (Git Bash on Windows is sufficient)

---

## Installation

```bash
npm install
```

---

## Running the Server

> Port 443 may require administrator privileges on Windows.

```bash
node index.js
```

The server will start on:

```
https://localhost:443
```

---

## Accessing the Site

1. Import the provided `client.pfx` file into your browser or OS certificate store.
2. When prompted, enter the certificate password.
3. Navigate to:

```
https://localhost:443
```

4. Select the client certificate when the browser requests it.

If the certificate is valid, the main page will load successfully.

---

## Expected Response

When authenticated with a valid client certificate, the server responds with a simple page displaying the client certificate subject information.

If no client certificate is provided or the certificate is invalid, access will be denied.

---

## Security Notice ⚠️

The certificates included in this repository are provided **for testing and demonstration purposes only**.

- They do **not** protect any real system or sensitive data.
- They are **not** tied to any personal identity.
- They must **not** be reused in production environments.
- Do **not** use these certificates to secure real services or infrastructure.

For production systems, always generate unique certificates and manage them securely.

---

## Disclaimer

This project intentionally prioritizes simplicity over security best practices in order to focus on demonstrating the mechanics of mutual TLS authentication.
