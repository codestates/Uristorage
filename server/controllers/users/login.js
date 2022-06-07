const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, sendAccessToken } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const loginId = await user.findOne({ where: { userId } });
    if (!loginId || !bcrypt.compareSync(password, loginId.dataValues.password)) {
      return res.send({ message: "잘못된 정보를 입력", success: false });
    } else {
      delete loginId.dataValues.password; //비밀번호는 토큰에 담지않는다.
      const accessToken = generateAccessToken(loginId.dataValues);
      sendAccessToken(res, accessToken);
      //토큰 만들고 res.status(200).cookie("jwt", accessToken).json({ token: accessToken, message: "로그인 성공" })
    }
  } catch (err) {
    return res.status(500).send({ message: "서버 에러", success: false });
  }
};
