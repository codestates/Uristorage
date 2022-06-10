const { group, user } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  // const userInfo = isAuthorized(req);
  const id = req.params.id;
  console.log(id); //groups.id로 그룹정보와 구성원 닉네임 조회
  const getGroup = await group.findAll({
    where: { id: id },
    include: [
      {
        model: user,
        required: true,
        as: "usergroup",
        attributes: ["nickname"],
      },
    ],
  });
  try {
    return res.status(200).json({ name: getGroup[0].name, image: getGroup[0].image, members: getGroup[0].usergroup, success: true });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
