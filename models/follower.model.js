module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define('follower', {
       
        userId: {
            type: Sequelize.INTEGER,
        },
        followerId: {
            type: Sequelize.INTEGER
        }

    },
    {
        tableName: 'followers'
    });
    return Follower;
}