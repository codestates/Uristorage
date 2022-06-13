const { user } = require("../../models");

module.exports = async (req, res) => {
  //그룹원 추가 시 닉네임 존재여부 확인
  const { nickname } = req.body;
  try {
    user
      .findOne({
        where: { nickname: nickname },
      })
      .then((data) => {
        if (data) {
          return res.send({ message: "존재하는 닉네임입니다.", success: true });
        } else {
          return res.send({ message: "존재하지 않는 닉네임입니다.", success: false });
        }
      });
  } catch (err) {
    return res.send(console.log(err));
  }
};
