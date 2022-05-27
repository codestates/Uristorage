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
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", indexRouter);

const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
