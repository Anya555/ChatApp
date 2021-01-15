const db = require("../models");
const Op = require("Sequelize").Op;

module.exports = {
  saveMessage: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      const message = await db.Messages.create(req.body);
      io.emit("message", req.body);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  findChatHistory: async (req, res) => {
    try {
      const messages = await db.Messages.findAll({
        where: {
          [Op.or]: [
            {
              senderId: req.params.senderId,
              receiverId: req.params.receiverId,
            },
            {
              senderId: req.params.receiverId,
              receiverId: req.params.senderId,
            },
          ],
        },
      });

      const user = await db.User.findByPk(req.params.senderId);
      const friend = await db.User.findByPk(req.params.receiverId);
      res.status(200).json({ messages, user, friend });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
