const { word } = require("../../models");

module.exports = async (req, res) => {
  console.log(req.params);
  const users_id = req.params.users_id;
  word.findAll({ where: { users_id: users_id } }).then((data) => res.send(data));
};
