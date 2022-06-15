const { generateAccessToken, sendAccessToken, removeAccessToken, isAuthorized } = require("../tokenFuntions");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { user } = require("../../models");

module.exports = async (req, res) => {
  const { code, state } = req.query;
  if (code && state) {
    const response = await axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=iwK_gnCquLTp4ZUNXTFs&client_secret=Roe7KhP5NS&code=${code}&state=${state}`).then((res) => res.json());
    const naverAccessToken = response.access_token;
    const naverUserInfo = await axios
      .get(`https://openapi.naver.com/v1/nid/me`, {
        headers: {
          Authorization: `Bearer ${naverAccessToken}`,
        },
      })
      .then((res) => res.json());
    console.log(naverUserInfo);
  }
};
