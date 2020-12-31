const router = require("express").Router();
const userRoutes = require("./usersApi");
const messengerRoutes = require("./messengerApi");

router.use("/users", userRoutes);
router.use("/messenger", messengerRoutes);
module.exports = router;
