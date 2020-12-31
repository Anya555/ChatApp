const router = require("express").Router();
const messengerController = require("../../controllers/messengerControllers");

router.route("/").post(messengerController.saveMessage);
module.exports = router;
