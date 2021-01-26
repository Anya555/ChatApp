const db = require("../models");
const Op = require("sequelize").Op;

module.exports = {
  saveMessage: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      const message = await db.Messages.create(req.body);
      io.emit("message", message);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // chat between two users
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
  // all chats for logged in user
  findAllUserChats: async (req, res) => {
    try {
      const messages = await db.Messages.findAll({
        where: {
          [Op.or]: [{ senderId: req.params.id }, { receiverId: req.params.id }],
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },

  deleteMessage: async (req, res) => {
    try {
      console.log(req.params.id);
      const messageToDelete = await db.Messages.destroy({
        where: {
          id: req.params.id,
        },
      });
      console.log("====================================");
      res.status(200).json(messageToDelete);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
