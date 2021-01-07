module.exports = function (sequelize, DataTypes) {
  const UserFriends = sequelize.define("UserFriends", {
    friendId: DataTypes.BIGINT,
    isPending: DataTypes.BOOLEAN,
  });

  return UserFriends;
};
