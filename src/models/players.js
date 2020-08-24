export const Players = (sequelize, DataTypes) => {
    sequelize.define('players', {
        author: DataTypes.STRING,
        player: DataTypes.STRING,
        player_id: DataTypes.STRING,
        guild: DataTypes.STRING,
        guild_id: DataTypes.STRING,
        hero: DataTypes.STRING
    }, { timestamps: false })
}