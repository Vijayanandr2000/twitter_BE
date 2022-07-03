module.exports = (sequelize, Sequelize) => {
    const Tweet = sequelize.define('tweet', {
        id:{
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        userId: {
            type: Sequelize.INTEGER,
        },
        tweet: {
            type: Sequelize.STRING
        },
    },
    {
        tableName: 'tweets'
    });
    return Tweet;
}