const https = require("https");
const fs = require("fs");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// ---------- Middlewares ----------
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mtls-test-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// ---------- TLS Options ----------
const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.crt"),
  ca: fs.readFileSync("./certs/ca.crt"),
  requestCert: true,
  rejectUnauthorized: true,
};

// ---------- Guards ----------
function mtlsRequired(req, res, next) {
  if (!req.client.authorized) {
    return res.status(401).send("❌ Client certificate required");
  }
  next();
}

function loginRequired(req, res, next) {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect("/login");
}

// ---------- Routes ----------
app.get("/login", mtlsRequired, (req, res) => {
  res.sendFile(path.join(__dirname, "views/login.html"));
});

app.post("/login", mtlsRequired, (req, res) => {
  const { username, password } = req.body;

  if (username === "test" && password === "test123") {
    req.session.authenticated = true;
    return res.redirect("/");
  }

  res.redirect("/login?error=1");
});

app.get("/", mtlsRequired, loginRequired, (req, res) => {
  const cert = req.socket.getPeerCertificate();
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// ---------- Server ----------
https.createServer(options, app).listen(443, () => {
  console.log("🚀 HTTPS mTLS server running on https://localhost");
});
