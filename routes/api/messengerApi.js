const router = require("express").Router();
const messengerController = require("../../controllers/messengerControllers");

router.route("/").post(messengerController.saveMessage);
router
  .route("/user/:senderId/friend/:receiverId")
  .get(messengerController.findChatHistory);

router.route("/user/:id").get(messengerController.findAllUserChats);
module.exports = router;
