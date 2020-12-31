const db = require("../models");

module.exports = {
  saveMessage: async (req, res) => {
    try {
      const message = await db.Messages.create(req.body);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  findChatHistory: async (req, res) => {
    try {
      const messageHistory = await db.Messages.findAll({
        where: {
          userId: req.params.userId,
          friendId: req.params.friendId,
        },
      });
      res.status(200).json(messageHistory);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
