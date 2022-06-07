const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const { nickname, password, email, image } = req.body;
  const userInfo = isAuthorized(req);
  if (!nickname || !password || !email) {
    return res.send({ message: "변경하실 항목을 입력하세요", success: false });
  }
  try {
    if (userInfo) {
      const getUser = await user.findOne({
        where: { id: userInfo.id },
      });
      if (getUser) {
        if (!(getUser.nickname === nickname) && !(getUser.email === email)) {
          const existNickname = await user.findOne({ where: { nickname } });
          const existEmail = await user.findOne({ where: { email } });
          //현재 비밀번호 입력확인
          // if (!bcrypt.compareSync(password, getUser.password)) {
          //   return res.status(401).json({ message: "비밀번호가 틀렸습니다." });
          // } else {try {
          if (existNickname) {
            return res.json({ message: "이미 사용중인 닉네임입니다.", success: false });
          } else if (existEmail) {
            return res.json({ message: "이미 가입된 이메일입니다.", success: false });
          }
        } else {
          const hashed = await bcrypt.hash(password, 10);
          await user.update(
            {
              nickname,
              password: hashed,
              email,
              image,
            },
            {
              where: { id: userInfo.id },
            }
          );
          // }
          return (
            res
              //   .status(200, { "Access-Control-Allow-Origin": "*" })
              .status(200)
              .send({ message: "개인정보 수정 완료", success: true })
          );
        }
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
