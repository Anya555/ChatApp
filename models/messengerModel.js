module.exports = function (sequelize, DataTypes) {
  const Messages = sequelize.define("Messages", {
    message: DataTypes.STRING(5000),
    friendId: DataTypes.BIGINT,
    userId: DataTypes.BIGINT,
  });
  return Messages;
};
