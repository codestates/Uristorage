const { word, user } = require("../../models");

module.exports = async (req, res) => {
  //공개 단어 모두조회
  word
    .findAll({
      where: { public: true },
      include: [
        {
          model: user,
          required: true,
          attributes: ["nickname"],
        },
      ],
    })
    .then((data) => res.send(data));

  //user table
  //group table 정보도 다보내보자
};
