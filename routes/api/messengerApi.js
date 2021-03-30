const router = require("express").Router();
const messengerController = require("../../controllers/messengerControllers");

router.route("/").post(messengerController.saveMessage);
router
  .route("/user/:senderId/friend/:receiverId")
  .get(messengerController.findChatHistory);

router
  .route("/user/:userId")
  .put(messengerController.deleteChatHistoryForOneUser);

router.route("/user/:id").get(messengerController.findAllUserChats);

router.route("/").delete(messengerController.deleteChatHistoryForBothUsers);

router.route("/").put(messengerController.updateMessageInfo);
module.exports = router;
