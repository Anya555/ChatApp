const router = require("express").Router();
const userController = require("../../controllers/userControllers");

// =========== routes related user model ============================//
router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router.route("/").get(userController.getAllUsers);

router.route("/:id").get(userController.findUserById);

router.route("/:id").put(userController.updateUser);

// =========== routes related userFriends model ============================//

router.route("/:id/friends").post(userController.sendFriendRequest);

router.route("/:id/friends").get(userController.findAllUserFriends);

router.route("/friends/:id").put(userController.updateUserFriends);

router.route("/friends/:id").delete(userController.deleteFriendsRequest);

module.exports = router;
