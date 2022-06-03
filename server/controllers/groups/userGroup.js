const { user, group, word } = require("../../models");

module.exports = async (req, res) => {
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
    return res.status(200).json({ userGroups: getGroups[0].groups });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
