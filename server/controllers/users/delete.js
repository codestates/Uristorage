const { user } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);

  try {
    if (userInfo) {
      const getUser = await users.findOne({
        attributes: ["id", "email", "name", "phoneNumber"],
        where: { id: userInfo.id },
      });
      if (getUser) {
        await users.destroy({ where: { id: userInfo.id } });
        return res.status(200).json({ message: "삭제 완료" });
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "서버 에러" });
  }
};
