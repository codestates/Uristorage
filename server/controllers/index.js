module.exports = {
  signup: require("./users/signup"),
  deleteUser: require("./users/deleteUser"),
  login: require("./users/login"),
  logout: require("./users/logout"),
  getInfo: require("./users/getInfo"),
  isNickname: require("./users/isNickname"),
  modifyUser: require("./users/modifyUser"),
  createWord: require("./words/createWord"),
  modifyWord: require("./words/modifyWord"),
  deleteWord: require("./words/deleteWord"),
  groupWords: require("./words/groupWords"),
  publicWords: require("./words/publicWords"),
  userWords: require("./words/userWords"),
  groupMembers: require("./groups/groupMembers"),
  userGroup: require("./groups/userGroup"),
  createGroup: require("./groups/createGroup"),
  deleteGroup: require("./groups/deleteGroup"),
  modifyGroup: require("./groups/modifyGroup"),
};
