const { word } = require("../../models");
const { isAuthorized, removeAccessToken } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);
  const id = req.params.id;

  try {
    if (userInfo) {
      await word.destroy({ where: { id: id } });
      return res.status(200).json({ message: "단어를 삭제 했습니다." });
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    console.log(err);
    return res.status(503).json({ message: "서버 에러" });
  }
};
