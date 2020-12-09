module.exports = function (sequelize, DataTypes) {
  const UserFriends = sequelize.define("UserFriends", {
    user_id: DataTypes.BIGINT,
    friend_id: DataTypes.BIGINT,
  });
  return UserFriends;
};
