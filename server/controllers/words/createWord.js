const { word, word_group } = require("../../models");

module.exports = async (req, res) => {
  const createWord = req.body.word; //word테이블명 겹침
  const { users_id, groups_id, summary, content, image, pub, type, map, calendar } = req.body;

  if (!users_id || !createWord || !summary || !content || !pub || !type) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }
  try {
    word.create({
      users_id,
      word: createWord,
      summary,
      content,
      image,
      public: pub,
      type,
      map,
      calendar,
    });
    /*  word_group.create({
      words_id: 1,
      groups_id: 1,
    });
  */
    return res.status(201).json({ message: createWord + ":" + summary });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
