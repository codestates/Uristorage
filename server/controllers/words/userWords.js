const { word } = require("../../models");

module.exports = async (req, res) => {
  //유저아이디로 해당유저의 단어조회
  const users_id = req.params.users_id;
  word.findAll({ where: { users_id: users_id } }).then((data) => res.send(data));
};
