export const Settings = (sequelize, DataTypes) => {
    sequelize.define('settings', {
        guild_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        settings: {
            type: DataTypes.JSONB,
            defaultValue: []
        }
    }, { timestamps: false })
}