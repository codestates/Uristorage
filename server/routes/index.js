const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const wordRouter = require("./words");
const groupRouter = require("./groups");

router.use("/users", userRouter);
router.use("/words", wordRouter);
router.use("/groups", groupRouter);

module.exports = router;
