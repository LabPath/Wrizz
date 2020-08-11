export const Reminders = (sequelize, DataTypes) => {
    sequelize.define('reminders', {
        guildID: DataTypes.STRING,
        channelID: DataTypes.STRING,
        userID: DataTypes.STRING,
        reference: DataTypes.TEXT,
        content: DataTypes.TEXT,
        startAt: DataTypes.BIGINT,
        endAt: DataTypes.BIGINT,
    }, { timestamps: false })
}