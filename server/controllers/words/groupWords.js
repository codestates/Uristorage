const { user, group, word } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id; //groups.id로 해당 그룹의 단어 조회
  const getWords = await group.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: word,
        required: true,
        as: "wordgroup",
        attributes: ["users_id", "word", "summary", "content", "image", "type"],
        through: {
          attributes: ["words_id", "groups_id"],
        },
      },
    ],
  });
  try {
    return res.status(200).json({ groupWords: getWords[0].wordgroup });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
