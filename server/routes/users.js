const router = require("express").Router();
const controllers = require("../controllers");

router.post("/signup", controllers.signup);
router.post("/login", controllers.login);
router.get("/callback", controllers.naverCallback);
router.post("/logout", controllers.logout);
router.post("/nickname", controllers.isNickname);
router.get("/", controllers.getInfo);
router.put("/", controllers.modifyUser);
router.delete("/", controllers.deleteUser);

module.exports = router;
