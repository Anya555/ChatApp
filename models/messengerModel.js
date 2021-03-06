module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define("Messages", {
    message: DataTypes.STRING(5000),
    receiverId: DataTypes.BIGINT,
    senderId: DataTypes.BIGINT,
    userIdToDeleteChatHistory: DataTypes.BIGINT,
    seenByReceiver: DataTypes.BOOLEAN,
  });
  return Messages;
};
