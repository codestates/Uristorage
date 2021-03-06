require("dotenv").config();
const indexRouter = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send("Hello local");
});
// const port = 4000;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server runnning"));
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"));
}
module.exports = server;
