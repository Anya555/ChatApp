module.exports = function (sequelize, DataTypes) {
  const UserFriends = sequelize.define("UserFriends", {
    friendId: DataTypes.BIGINT,
    isPending: DataTypes.BOOLEAN,
  });
  // UserFriends.associate = function (models) {
  //   UserFriends.hasMany(models.Messages, { foreignKey: "friendId" });
  // };
  return UserFriends;
};
