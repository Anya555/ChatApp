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
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user) return res.status(400).json({ status: "Email already exists" });

      // =============================================================//
      const hashedpassword = await hashPassword(password);
      user = new User({
        firstName,
        lastName,
        email,
        password: hashedpassword,
      });

      // The JWT_SECRET environmental variable holds a private key that is used when signing the JWT,
      //this key will also be used when parsing the JWT to verify that it hasn’t been compromised by an authorized party.
      const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      await user.save();
      delete user.dataValues.password;

      res.json({
        user,
        accessToken,
        refreshToken,
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
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      await User.update(accessToken, { where: { id: user.id } });
      user.refreshToken = refreshToken;
      delete user.dataValues.password;

      res.status(200).json({
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "Data you entered doesn't match our records" });
    }
  },

  findUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ status: "User does not exist" });
    }
  },

  allowIfLoggedin: async (req, res, next) => {
    try {
      const user = res.locals.loggedInUser; // res.locals.loggedInUser variable holds the details of the logged-in user
      if (!user)
        return res.status(401).json({
          status: "You need to be logged in to access this route",
        });
      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll(req.query);
      res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ status: "No users have been found" });
    }
  },
};
