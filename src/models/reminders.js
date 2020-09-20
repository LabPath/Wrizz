export const Reminders = (sequelize, DataTypes) => {
    sequelize.define('reminders', {
        author: DataTypes.STRING,
        guild_id: DataTypes.STRING,
        channel_id: DataTypes.STRING,
        _content: DataTypes.TEXT,
        _start: DataTypes.BIGINT,
        _end: DataTypes.BIGINT
    }, { timestamps: false })
}