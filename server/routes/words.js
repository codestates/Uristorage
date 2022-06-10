const router = require("express").Router();
const controllers = require("../controllers");

router.get("/user/:users_id", controllers.userWords); //words.users_id로 해당 유저 단어조회
router.get("/group/:id", controllers.groupWords); //groups.id로 해당 그룹에 단어조회
router.get("/public", controllers.publicWords); //공개처리된 모든 단어조회
router.post("/", controllers.createWord);
router.delete("/:id", controllers.deleteWord);

module.exports = router;
