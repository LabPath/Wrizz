export const Suggestions = (sequelize, DataTypes) => {
    sequelize.define('suggestions', {
        author: DataTypes.STRING,
        guild_id: DataTypes.STRING,
        message_id: DataTypes.STRING,
        suggest_id: DataTypes.STRING
    }, { timestamps: false })
}