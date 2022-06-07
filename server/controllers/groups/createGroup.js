const { group, user_group } = require("../../models");

module.exports = async (req, res) => {
  //param으로 받아올 유저아이디가 많다.
  const { users_id, name, image } = req.body;

  if (!users_id || !name) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }
  try {
    group
      .create({
        name,
        image,
      })
      .then((data) => {
        const groups_id = data.id;
        user_group.create({
          users_id,
          groups_id,
        });
      });
    return res.status(201).json({ message: "ok" });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
