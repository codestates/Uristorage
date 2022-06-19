const { generateAccessToken, sendAccessToken, removeAccessToken, isAuthorized } = require("../tokenFuntions");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
const bcrypt = require("bcrypt");
const { user } = require("../../models");

module.exports = async (req, res) => {
  const { code } = req.body;
  if (code) {
    const response = await axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_ID}&client_secret=${process.env.NAVER_SECRET}&code=${code}&state=code`);
    const naverAccessToken = response.data.access_token;
    const naverUserInfo = await axios.get(`https://openapi.naver.com/v1/nid/me`, {
      headers: {
        Authorization: `Bearer ${naverAccessToken}`,
      },
    });
    const email = naverUserInfo.data.response.email;
    const userId = naverUserInfo.data.response.id;
    const nickname = naverUserInfo.data.response.nickname + "_naver";
    const image = naverUserInfo.data.response.profile_image;
    let userInfo = await user.findOne({ where: { userId } });
    if (!userInfo) {
      userInfo = await user.create({ userId, email, nickname, image });
    }
    const accessToken = generateAccessToken(userInfo.dataValues);
    sendAccessToken(res, accessToken);
  } else {
    return res.status(500).send({ message: "서버 에러", success: false });
  }
};
