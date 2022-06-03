require("dotenv").config();
const indexRouter = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

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
  res.send("Hello world!");
});
const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
