export const Settings = (sequelize, DataTypes) => {
    sequelize.define('settings', {
        guildID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        settings: {
            type: DataTypes.JSONB,
            defaultValue: []
        }
    }, { timestamps: false })
}