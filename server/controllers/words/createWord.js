const { word, word_group } = require("../../models");

module.exports = async (req, res) => {
  const createWord = req.body.word; //word테이블명 겹침
  const { users_id, groups_id, summary, content, image, pub, type, map, calendar } = req.body;
  console.log("groups_id", groups_id);
  if (!users_id || !createWord || !summary || !content || !pub || !type) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }
  try {
    word
      .create({
        users_id,
        word: createWord,
        summary,
        content,
        image,
        public: pub,
        type,
        map,
        calendar,
      })
      .then((data) => {
        const words_id = data.id;
        if (groups_id.length !== 0) {
          for (let i = 0; i < groups_id.length; i++) {
            console.log("word_group", groups_id[i]);
            word_group.create({
              words_id,
              groups_id: groups_id[i],
            });
          }
        }
      });
    return res.status(201).json({ message: `[${createWord}` + ":" + `${summary}]추가 되었습니다.`, success: true });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
