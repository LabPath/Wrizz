export const Reminders = (sequelize, DataTypes) => {
    sequelize.define('reminders', {
        guild_id: DataTypes.STRING,
        channel_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        reference: DataTypes.TEXT,
        content: DataTypes.TEXT,
        start: DataTypes.BIGINT,
        end: DataTypes.BIGINT,
    }, { timestamps: false })
}