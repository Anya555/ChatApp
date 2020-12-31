const db = require("../models");

module.exports = {
  saveMessage: async (req, res) => {
    try {
      const message = await db.Messages.create(req.body);
      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  },
};
