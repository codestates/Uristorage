const { group, user, user_group } = require("../../models");
const { isAuthorized } = require("../tokenFuntions");

module.exports = async (req, res) => {
  const { name, image, members } = req.body;
  const id = req.params.id; //groups.id로 해당 그룹 정보 변경
  const userInfo = isAuthorized(req);

  if (!name) {
    return res.send({ message: "그룹 이름을 입력하세요", success: false });
  }
  try {
    if (userInfo) {
      const getGroup = await group.findOne({
        where: { id: id },
      });
      if (getGroup) {
        await group.update(
          {
            name,
            image,
          },
          {
            where: { id: id },
          }
        );
        await user_group.destroy({ where: { groups_id: id } });
        for (let i = 0; i < members.length; i++) {
          user
            .findOne({
              attributes: ["id"],
              where: { nickname: members[i] },
            })
            .then((data) => {
              const users_id = data.id;
              user_group.create({
                users_id,
                groups_id: id,
              });
            });
        }
        return (
          res
            //   .status(200, { "Access-Control-Allow-Origin": "*" })
            .status(200)
            .send({ message: "그룹 정보가 변경 되었습니다.", success: true })
        );
      }
    } else {
      return res.status(401).json({ message: "권한이 없습니다." });
    }
  } catch (err) {
    return res.status(500).json({ message: "서버 에러" });
  }
};
