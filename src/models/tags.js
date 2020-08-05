export const Tags = (sequelize, DataTypes) => {
    sequelize.define('tags', {
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        content: DataTypes.TEXT,
        aliases: DataTypes.JSONB,
        guildID: DataTypes.STRING,
        author: DataTypes.STRING,
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        uses: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        edits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    })
}