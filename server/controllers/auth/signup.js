const { user } = require("../../models");

module.exports = async (req, res) => {
  const { userId, email, password, nickname } = req.body;
  if (!userId || !password || !email || !nickname) {
    return res.status(422).send("insufficient parameters supplied");
  }

  user
    .findOrCreate({
      where: { userId: userId },
      defaults: { userId: userId, password: password, email: email, nickname: nickname },
    })
    .then(([result, created]) => {
      if (!created) {
        return res.status(409).send("email id");
      }
      // const accessToken = generateAccessToken(result.dataValues);
      // sendAccessToken(res, accessToken);
      res.status(201).send({ message: "ok" });
    });
};
