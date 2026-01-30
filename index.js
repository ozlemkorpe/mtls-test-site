const https = require("https");
const fs = require("fs");
const express = require("express");

const app = express();

const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.crt"),
  ca: fs.readFileSync("./certs/ca.crt"),
  requestCert: true,
  rejectUnauthorized: true
};

app.get("/", (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send("Client certificate required");
  }

  const cert = req.socket.getPeerCertificate();

  res.send(`
    <h1>✅ mTLS Test Site</h1>
    <pre>${JSON.stringify(cert.subject, null, 2)}</pre>
  `);
});

https.createServer(options, app).listen(443, () => {
  console.log("🚀 HTTPS mTLS server running on 443");
});
