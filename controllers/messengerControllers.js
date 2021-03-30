const db = require("../models");
const Op = require("sequelize").Op;

module.exports = {
  saveMessage: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      const message = await db.Messages.create(req.body);
      io.emit("addMessage", message);

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

  deleteChatHistoryForOneUser: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      let messageIdArr = req.body;
      let userId = req.params.userId;

      const chatHistory = await db.Messages.update(
        {
          userIdToDeleteChatHistory: userId,
        },
        {
          where: {
            id: {
              [Op.in]: messageIdArr, // this will update all the records
            }, // with an id from the messageId array
          },
        }
      );
      let messageToDeleteInfo = {
        messageIdArr: messageIdArr,
        userId: Number(userId),
      };
      io.emit("deleteMessage", messageToDeleteInfo);
      res.status(200).json(chatHistory);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteChatHistoryForBothUsers: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      let messageIdArr = req.query.id;
      const chatHistory = await db.Messages.destroy({
        where: { id: messageIdArr },
      });
      let messageToDeleteInfo = {
        messageIdArr: messageIdArr,
      };
      io.emit("deleteMessage", messageToDeleteInfo);
      res.status(200).json(chatHistory);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  updateMessageInfo: async (req, res) => {
    try {
      const io = req.app.get("socketio");
      let messageIdArr = req.body;
      const messageToUpdate = await db.Messages.update(
        {
          seenByReceiver: true,
        },
        {
          where: {
            id: {
              [Op.in]: messageIdArr, // this will update all the records
            }, // with an id from the messageId array
          },
        }
      );
      io.emit("messageSeenByReceiver", messageIdArr);
      res.status(200).json(messageToUpdate);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
