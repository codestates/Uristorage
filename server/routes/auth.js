const router = require("express").Router();
const controllers = require("../controllers");

router.post("/signup", controllers.signup);
// router.post("/login", controllers.login);
// router.post("/logout", controllers.logout);

module.exports = router;
