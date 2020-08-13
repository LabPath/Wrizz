export const Suggestions = (sequelize, DataTypes) => {
    sequelize.define('suggestions', {
        guild_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        reference: DataTypes.STRING,
        message_id: DataTypes.STRING
    }, { timestamps: false })
}