# mTLS Test Site (Node.js)

A minimal Node.js application that demonstrates **mutual TLS (mTLS)** authentication combined with a **basic form-based login**.

This project is intended for **testing, learning, and demonstration purposes only**.  
It provides a simple HTTPS server that requires a valid **client certificate** and a secondary **username/password authentication** to access a secure area.

---

## Features

- HTTPS server built with Node.js and Express
- Mutual TLS (client certificate authentication)
- Secondary form-based authentication (username & password)
- Fixed certificates and credentials (deterministic setup)
- Works on Windows environments (including AWS EC2 Windows)
- No database, no external services, minimal dependencies
- Clean separation between server logic and HTML views
---

## How It Works

1. The server runs over **HTTPS (port 443)**.
2. A custom Certificate Authority (CA) is used.
3. The server **requires** a valid client certificate signed by the CA.
4. If the client certificate is valid, the user is redirected to a login page.
5. A simple form-based authentication is required:
   - **Username:** `test`
   - **Password:** `test123`
6. Once both authentication layers succeed, the secure page is displayed.


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
2. When prompted, enter the certificate password. `clientpass123`
3. Navigate to:

```
https://localhost:443
```

4. Select the client certificate when the browser requests it.
5. Complete the login form using:

```
Username: test
Password: test123
```
---

## Expected Response

- If the client certificate is missing or invalid, the TLS handshake fails or access is denied.
- If the client certificate is valid but login credentials are incorrect, access is denied.
- If both authentication steps succeed, the secure page is displayed.
---

## Security Notice ⚠️

The certificates and credentials included in this repository are provided **strictly for testing and demonstration purposes only**.

- They do **not** protect any real system or sensitive data.
- They are **not** tied to any personal identity.
- They must **not** be reused in production environments.
- Do **not** use these certificates to secure real services or infrastructure.

For production systems, always generate unique certificates and manage them securely using appropriate key management practices.

---

## Disclaimer

This project intentionally prioritizes simplicity and clarity over security best practices in order to focus on demonstrating the mechanics of **mutual TLS authentication combined with a secondary authentication layer**.

