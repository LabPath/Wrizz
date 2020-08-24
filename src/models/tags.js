export const Tags = (sequelize, DataTypes) => {
    sequelize.define('tags', {
        author: DataTypes.STRING,
        guild_id: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        content: DataTypes.TEXT,
        aliases: DataTypes.JSONB,
        uses: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        edits: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, 
    { 
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    })
}