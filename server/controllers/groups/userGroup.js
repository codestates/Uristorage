const { user, group, word } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const userInfo = isAuthorized(req);
  const id = req.params.id; //users.id로 해당 유저의 그룹들을 조회
  const getGroups = await user.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: group,
        required: true,
        attributes: ["name", "image"],
        through: {
          attributes: ["users_id", "groups_id"],
        },
      },
    ],
  });
  try {
    if (userInfo) {
      if (getGroups.length === 0) {
        //해당 유저가 그룹이 없는 상태이면
        return res.json({ userGroups: [] });
      }
      return res.status(200).json({ userGroups: getGroups[0].groups });
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
