const { user } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  const { userId, email, password, nickname } = req.body;

  if (!userId || !password || !email || !nickname) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }
  try {
    const signupUserId = await user.findOne({ where: { userId } });
    const signupEmail = await user.findOne({ where: { email } });
    const hashed = await bcrypt.hash(password, 10);

    if (signupUserId) {
      return res.json({ message: "이미 가입된 아이디입니다.", success: false });
    } else if (signupEmail) {
      return res.json({ message: "이미 가입된 이메일입니다.", success: false });
    } else {
      user.create({
        userId,
        email,
        nickname,
        password: hashed,
      });
      return res.status(201).json({ message: "회원가입 성공", success: true });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
