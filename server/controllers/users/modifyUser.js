const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const { nickname, password, email, image } = req.body;
  const userInfo = isAuthorized(req);
  if (!nickname || !email) {
    return res.send({ message: "변경하실 항목을 입력하세요", success: false });
  }
  if (!password) {
    return res.send({ message: "비밀 번호를 입력하세요", success: false });
  }
  try {
    if (userInfo) {
      const getUser = await user.findOne({
        where: { id: userInfo.id },
      });
      if (getUser) {
        if (!(getUser.nickname === nickname)) {
          const existNickname = await user.findOne({ where: { nickname: nickname } });
          if (existNickname) {
            return res.json({ message: "이미 사용중인 닉네임입니다.", success: false });
          }
        } else if (!(getUser.email === email)) {
          const existEmail = await user.findOne({ where: { email: email } });
          if (existEmail) {
            return res.json({ message: "이미 사용중인 이메일입니다.", success: false });
          }
        }
      }
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
      const modifyUser = await user.findOne({
        attributes: ["id", "userId", "email", "nickname", "image"],
        where: { id: userInfo.id },
      });
      console.log("ffffffff", modifyUser);

      return (
        res
          //   .status(200, { "Access-Control-Allow-Origin": "*" })
          .status(200)
          .send({ data: modifyUser, message: "개인정보 수정 완료", success: true })
      );
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
