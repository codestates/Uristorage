const { user } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);
  try {
    if (userInfo) {
      const getUser = await user.findOne({
        attributes: ["id", "userId", "email", "nickname", "image"],
        where: { id: userInfo.id },
      });
      if (getUser) {
        return res.status(200).json({ data: getUser, message: "조회 완료" });
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
