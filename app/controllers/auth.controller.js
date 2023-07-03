const db = require("../models");
const { authenticate } = require("../authentication/authentication");

const User = db.user;
const Session = db.session;

const { encrypt } = require("../authentication/crypto");

exports.login = async (req, res) => {

  let user = {};
  await User.findAll({ where: { email: req.body.email } })
    .then((data) => {
      user = data[0];
    })
    .catch((error) => {
      console.log(error);
    });
  if (user != null) {
    let hash = await hashPassword(req.body.password, user.salt);
    if (Buffer.compare(user.password, hash) !== 0) {
      return res.status(401).send({
        message: "Invalid password!",
      });
    }
    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 100);

    const session = {
      email: user.email,
      userId: user.id,
      expirationDate: expireTime,
    };
    await Session.create(session).then(async (data) => {
      let sessionId = data.id;
      let token = await encrypt(sessionId);
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        number: user.number,
        id: user.id,
        user_role: user.user_role,
        status: user.status,
        dp: user.dp,
        token: token,
      };
      res.send(userInfo);
    });
  } else {
    return res.status(401).send({
      message: "Not registered with us yet! Please connect with admin.",
    });
  };

};

exports.logout = async (req, res) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (
    auth != null &&
    auth.startsWith("Bearer ") &&
    (typeof require !== "string" || require === "token")
  ) {
    res.status(200).send({ message: "Logout successful" });
  }
};