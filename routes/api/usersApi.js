const router = require("express").Router();
const userController = require("../../controllers/userControllers");

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.route("/user-profile/:id/friend").post(userController.addFriend);

router.route("/user-profile/:id").get(userController.findUserById);

router.route("/").get(userController.getAllUsers);

router.route("/friend-profile/:id").get(userController.checkIfFriend);

module.exports = router;
