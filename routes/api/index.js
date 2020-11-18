const router = require("express").Router();
const userRoutes = require("./usersApi");

router.use("/users", userRoutes);
module.exports = router;
