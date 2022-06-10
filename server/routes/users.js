const router = require("express").Router();
const controllers = require("../controllers");

router.post("/signup", controllers.signup);
router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
router.get("/", controllers.getInfo);
router.put("/", controllers.modifyUser);
router.delete("/", controllers.deleteUser);

module.exports = router;
