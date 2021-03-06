const { word, user, group } = require("../../models");

module.exports = async (req, res) => {
  //유저아이디로 해당유저의 단어조회
  //user table
  //group table 정보도 다보내보자
  const users_id = req.params.users_id;
  word
    .findAll({
      where: { users_id: users_id },
      include: [
        {
          model: user,
          required: true,
          attributes: ["nickname"],
        },
        {
          model: group,
          require: true,
          attributes: ["id"],
        },
      ],
    })
    .then((data) => res.send(data));
};
