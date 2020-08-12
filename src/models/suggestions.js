export const Suggestions = (sequelize, DataTypes) => {
    sequelize.define('suggestions', {
        guildID: DataTypes.STRING,
        userID: DataTypes.STRING,
        reference: DataTypes.STRING,
        messageID: DataTypes.STRING
    }, { timestamps: false })
}