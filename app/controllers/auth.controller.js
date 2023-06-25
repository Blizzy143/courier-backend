const {Session, User} = require("../models");
const { authenticate } = require("../authentication/authentication");

const { encrypt } = require("../authentication/crypto");

exports.login = async (req, res) => {
  let { userId } = await authenticate(req, res, "credentials");

  if (userId !== undefined) {
    let user = {};
    await User.findByPk(userId).then((data) => {
      user = data;
    });

    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = {
      email: user.email,
      userId: user.user_id,
      expirationDate: expireTime,
    };
    await Session.create(session).then(async (data) => {
      let sessionId = data.id;
      let token = await encrypt(sessionId);
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.user_id,
        user_type: user.user_type,
        token: token,
      };
      res.send(userInfo);
    });
  }
};

exports.logout = async (req, res) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (
    auth != null &&
    auth.startsWith("Bearer ") &&
    (typeof require !== "string" || require === "token")
  ) {
    res.status(200).send({message:"Logout successful"});
  }
};