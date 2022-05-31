const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const wordRouter = require("./words");

router.use("/users", userRouter);
router.use("/words", wordRouter);

module.exports = router;
