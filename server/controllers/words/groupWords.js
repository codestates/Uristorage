const { user, group, word } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id; //groups.id로 해당 그룹의 단어 조회
  //users.nickname도 필요한가
  const getWords = await group.findAll({
    where: {
      id: id,
    },
    include: [
      {
        model: word,
        required: true,
        as: "wordgroup",
        // attributes: ["id","users_id", "word", "summary", "content", "image", "type"],
        // through: {
        //   attributes: ["words_id", "groups_id"],
        // },
      },
    ],
  });
  try {
    if (getWords.length === 0) {
      return res.json({ groupWords: [], message: "그룹에 속한 단어가 없습니다." });
    } else {
      return res.status(200).json({ groupWords: getWords[0].wordgroup });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
