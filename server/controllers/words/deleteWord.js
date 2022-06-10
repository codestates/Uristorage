const { user } = require("../../models");
const { isAuthorized, removeAccessToken } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);

  try {
    if (userInfo) {
      const getUser = await user.findOne({
        where: { id: userInfo.id },
      });
      if (getUser) {
        await user.destroy({ where: { id: userInfo.id } });
        removeAccessToken(res);
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "서버 에러" });
  }
};
