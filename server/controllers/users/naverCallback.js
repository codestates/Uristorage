const { generateAccessToken, sendAccessToken, removeAccessToken, isAuthorized } = require("../tokenFuntions");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { user } = require("../../models");
const client_id = "iwK_gnCquLTp4ZUNXTFs";
const client_secret = "Roe7KhP5NS";
const redirectURI = "https://localhost:4000/users/callback";

module.exports = async (req, res) => {
  const { code, state } = req.query;
  if (code && state) {
    const response = await axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=iwK_gnCquLTp4ZUNXTFs&client_secret=Roe7KhP5NS&code=${code}&state=${state}`);
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
    let userInfo = await user.findOne({ where: { email } });
    if (!userInfo) {
      userInfo = await user.create({ userId, email, nickname, image });
    }
    const accessToken = generateAccessToken(userInfo.dataValues);
    sendAccessToken(res, accessToken);
  } else {
    return res.status(500).send({ message: "서버 에러", success: false });
  }
};
