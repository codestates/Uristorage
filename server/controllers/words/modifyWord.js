const { word, word_group } = require("../../models");

module.exports = async (req, res) => {
  const createWord = req.body.word; //word테이블명 겹침
  const { id, groups_id, summary, content, image, pub, type, map, calendar } = req.body;
  if (!createWord || !summary || !content || !type) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }
  try {
    await word.update(
      {
        word: createWord,
        summary,
        content,
        image,
        public: pub,
        type,
        map,
        calendar,
      },
      { where: { id: id } }
    );

    await word_group.destroy({ where: { words_id: id } });
    if (groups_id.length !== 0) {
      for (let i = 0; i < groups_id.length; i++) {
        word_group.create({
          words_id: id,
          groups_id: groups_id[i],
        });
      }
    }
    return res.status(201).json({ message: `[${createWord}` + ":" + `${summary}]변경 되었습니다.`, success: true });
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
