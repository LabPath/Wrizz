import { Provider } from 'discord-akairo'
import { Guild } from 'discord.js'
import { sequelize } from '../models/index'

export default class SettingsProvider extends Provider {
    constructor(model = sequelize) {
        super()
        
        this.model = model
    }

    async init() {
        await this.model.sync().then(async() => {
            const settings = await this.model.models.settings.findAll()
            for (const setting of settings) {
                this.items.set(setting.guildID, setting.settings)
            }
        })
    }

    get(guild, key, defaultValue) {
        const id = this.constructor.getGuildID(guild)
        if (this.items.has(id)) {
            const value = this.items.get(id)[key]
            return value === null ? defaultValue : value
        }
        return defaultValue
    }

    async set(guild, key, value) {
        const id = this.constructor.getGuildID(guild)
        const data = this.items.get(id) || {}
        data[key] = value
        this.items.set(id, data)

        return await this.model.models.settings.upsert({ guildID: id, settings: data })
    }

    async delete(guild, key) {
        const id = this.constructor.getGuildID(guild)
        const data = this.items.get(id) || {}
        delete data[key]

        return await this.model.models.settings.upsert({ guildID: id, settings: data })
    }

    async clear(guild) {
        const id = this.constructor.getGuildID(guild)
        this.items.delete(id)
        return this.model.destroy()
    }

    static getGuildID(guild) {
        if (guild instanceof Guild) return guild.id
        if (guild === 'global' || guild === null) return '0'
        if (typeof guild === 'string' && /^\d+$/.test(guild)) return guild
        throw new TypeError('Invalid guild specified. Must be a Guild instance, Guild ID, "global", or null')
    }
}