module.exports = {
  signup: require("./users/signup"),
  login: require("./users/login"),
  logout: require("./users/logout"),
  getInfo: require("./users/getInfo"),
  createWord: require("./words/createWord"),
  groupWords: require("./words/groupWords"),
  publicWords: require("./words/publicWords"),
  userWords: require("./words/userWords"),
  userGroup: require("./groups/userGroup"),
};
