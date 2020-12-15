module.exports = function (sequelize, DataTypes) {
  const UserFriends = sequelize.define("UserFriends", {
    friendId: DataTypes.BIGINT,
  });
  return UserFriends;
};
