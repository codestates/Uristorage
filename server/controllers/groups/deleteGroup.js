const { group } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);
  const id = req.params.id; //groups.id로 찾아 그룹삭제

  try {
    if (userInfo) {
      const getGroup = await group.findOne({
        where: { id: id },
      });
      if (getGroup) {
        await group.destroy({ where: { id: id } });
        return res.status(205).json({ message: "삭제 되었습니다.", success: true });
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "서버 에러" });
  }
};
