import { Provider } from 'discord-akairo'
import { Guild } from 'discord.js'
import { sequelize } from '../models/index'
import { PGSQL } from '../utils/postgresql'

export default class SettingsProvider extends Provider {
    constructor(db = sequelize) {
        super()
        
        this.sequelize = db
    }

    async init() {
        await this.sequelize.sync().then(async() => {
            const settings = await this.sequelize.models.settings.findAll()
            for (const setting of settings) {
                this.items.set(setting.guild_id, setting.settings)
            }
        })
    }

    get(guild, key, defaultValue) {
        const id = this.constructor.getGuildID(guild)
        if (this.items.has(id)) {
            const value = this.items.get(id)[key]
            return !value ? defaultValue : value
        }
        return defaultValue
    }

    async set(guild, key, value) {
        const id = this.constructor.getGuildID(guild)
        const data = this.items.get(id) || {}
        data[key] = value
        this.items.set(id, data)

        return PGSQL.SETTINGS.SET(id, data)
    }

    async delete(guild, key) {
        const id = this.constructor.getGuildID(guild)
        const data = this.items.get(id) || {}
        delete data[key]

        return await this.sequelize.models.settings.upsert({ guild_id: id, settings: data })
    }

    async clear(guild) {
        const id = this.constructor.getGuildID(guild)
        this.items.delete(id)
        return this.sequelize.destroy() // TODO: create delete query
    }

    static getGuildID(guild) {
        if (guild instanceof Guild) return guild.id
        if (guild === 'global' || guild === null) return '0'
        if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild
        throw new TypeError(`${guild} is not a valid instance of Guild`)
    }
}