const router = require("express").Router();
const controllers = require("../controllers");

router.get("/:users_id", controllers.getwords);

module.exports = router;
