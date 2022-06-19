const express = require("express");
const router = express.Router();
const userRouter = require("./users");
const wordRouter = require("./words");
const groupRouter = require("./groups");
const oauthRouter = require("./oauth");

router.use("/users", userRouter);
router.use("/words", wordRouter);
router.use("/groups", groupRouter);
router.use("/oauth", oauthRouter);

module.exports = router;
