const { user } = require("../../models");
const bcrypt = require("bcrypt");
const { generateAccessToken, sendAccessToken } = require("../tokenFuntions");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

module.exports = async (req, res) => {
  // 클라이언트에서 전달받은 코드를 이용해서 카카오에 token 요청
  const code = req.headers["authorization"];
  try {
    const token = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}&client_secret=${process.env.KAKAO_CLIENT_SECRET}`);
    // 카카오에서 발급받은 토큰으로 유저정보 요청
    const kakaoUserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });
    const userId = kakaoUserInfo.data.id;
    const { email, profile } = kakaoUserInfo.data.kakao_account;
    const userInfo = await user.findOne({ where: { userId } });
    // 유저 정보가 있는지 확인
    if (!userInfo) {
      console.log(email, profile.nickname, profile.profile_image_url);
      const newUserInfo = await user.create({
        email: email,
        userId: userId,
        nickname: profile.nickname + "_kakao",
        image: profile.profile_image_url,
      });
      console.log(newUserInfo);
      delete newUserInfo.dataValues.password; //비밀번호는 토큰에 담지않는다.
      const accessToken = generateAccessToken(newUserInfo.dataValues);
      sendAccessToken(res, accessToken);
    } else {
      delete userInfo.dataValues.password; //비밀번호는 토큰에 담지않는다.
      const accessToken = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accessToken);
    }
  } catch (err) {
    res.status(500).json({ message: "서버 에러11111" });
  }
};
