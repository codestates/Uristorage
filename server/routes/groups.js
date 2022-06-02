const router = require("express").Router();
const controllers = require("../controllers");

router.get("/:id", controllers.userGroup);

module.exports = router;
