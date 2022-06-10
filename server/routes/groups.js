const router = require("express").Router();
const controllers = require("../controllers");

router.get("/:id", controllers.groupInfo); //그룹정보 조회
router.get("/user/:id", controllers.userGroup); //users.id로 해당 유저의 그룹들 조회
router.post("/", controllers.createGroup);
router.delete("/:id", controllers.deleteGroup); //group.id로 해당 그룹 삭제

module.exports = router;
