const router = require("express").Router();
const controllers = require("../controllers");

router.get("/:id", controllers.userGroup);
router.post("/", controllers.createGroup); //users.nickname으로 구성된 그룹생성

module.exports = router;
