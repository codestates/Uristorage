const { isAuthorized, removeAccessToken } = require("../tokenFuntions");

module.exports = (req, res) => {
  const userInfo = isAuthorized(req);

  try {
    if (userInfo) {
      console.log("logout");
      removeAccessToken(res);
    } else {
      return res.json({ message: "이미 로그아웃 된 상태입니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
