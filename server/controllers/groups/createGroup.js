const { user, group, user_group } = require("../../models");

module.exports = async (req, res) => {
  //param으로 받아올 유저아이디가 많다.
  const { name, image, members } = req.body;

  if (!name || !members) {
    return res.send({ message: "필수 항목을 입력하세요", success: false });
  }

  try {
    group
      .create({
        name,
        image,
      })
      .then((data) => {
        const groups_id = data.id;
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
                groups_id,
              });
            });
        }
      });
    return res.status(201).json({ message: `${name}` + ":" + `${members}`, success: true });
  } catch {
    return res.status(500).json({ message: "서버 에러" });
  }

  //   for (let i = 0; i < members.length; i++) {
  //     user
  //       .findOne({
  //         attributes: ["id"],
  //         where: { nickname: members[i] },
  //       })
  //       .then((data) => {
  //         const users_id = data.id;
  //         group
  //           .create({
  //             name,
  //             image,
  //           })
  //           .then((data) => {
  //             const groups_id = data.id;
  //             console.log(users_id);
  //             if (users_id) {
  //               user_group.create({
  //                 users_id,
  //                 groups_id,
  //               });
  //             } else {
  //               return res.send({ message: `${members[i]}가 존재하지 않습니다.`, success: false });
  //             }
  //           });
  //       });
  //   }
  //   return res.status(201).json({ message: `${name}` + ":" + `${members}`, success: true });
  // } catch (err) {
};
