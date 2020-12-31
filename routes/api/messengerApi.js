const router = require("express").Router();
const messengerController = require("../../controllers/messengerControllers");

router.route("/").post(messengerController.saveMessage);
router
  .route("/user/:userId/friend/:friendId")
  .get(messengerController.findChatHistory);
module.exports = router;
