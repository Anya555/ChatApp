const User = require("../models").Users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// used when logging in to verify if the password is the same with the password the user provided when signing up
async function validatePassword(plainpassword, hashedpassword) {
  return await bcrypt.compare(plainpassword, hashedpassword);
}
module.exports = {
  signup: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      // ===========================================================//
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user) return res.status(400).json({ status: "Email already exists" });

      // =============================================================//
      const hashedpassword = await hashPassword(password);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedpassword,
      });

      // The JWT_SECRET environmental variable holds a private key that is used when signing the JWT,
      //this key will also be used when parsing the JWT to verify that it hasn’t been compromised by an authorized party.
      const accessToken = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      newUser.accessToken = accessToken;
      await newUser.save();
      res.json({
        data: newUser,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return res.status(400).json({ status: "Email does not exist" });
      }
      const validPassword = await validatePassword(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ status: "Password is incorrect" });
      }
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await User.update(accessToken, { where: { id: user.id } });
      console.log("this works");
      res.status(200).json({
        data: {
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          userId: user.id,
        },
        accessToken,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Data you entered doesn't match our records" });
    }
  },
};
