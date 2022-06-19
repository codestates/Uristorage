const router = require("express").Router();
const controllers = require("../controllers");

router.post("/kakao/callback", controllers.kakaoCallback);
router.post("/naver/callback", controllers.naverCallback);

module.exports = router;
