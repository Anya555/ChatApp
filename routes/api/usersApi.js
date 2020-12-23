const router = require("express").Router();
const userController = require("../../controllers/userControllers");

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.route("/user-profile/:id/friend").post(userController.sendFriendRequest);

router.route("/user-profile/:id").get(userController.findUserById);

router.route("/").get(userController.getAllUsers);

router.route("/friend-profile/:id").get(userController.findAllUserFriends);

router.route("/user-profile/:id").put(userController.confirmFriendsRequest);
module.exports = router;
