require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const db = require("./models");
const PORT = process.env.PORT || 3001;
const jwt = require("jsonwebtoken");
const User = require("./models").User;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    if (req.headers["x-access-token"]) {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      /// Check if token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }

      res.locals.loggedInUser = await User.findByPk(userId);
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "./client/dist/client")));
}
app.use(routes);

db.sequelize.sync().then(function () {
  const server = app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });

  const options = {
    cors: true,
    origins: ["http://localhost:3001"],
  };
  const io = require("socket.io")(server, options);

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
});
