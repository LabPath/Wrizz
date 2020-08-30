import { stripIndents } from 'common-tags'
import { MessageEmbed } from 'discord.js'
import { Command } from 'discord-akairo'
import { COLORS } from '../../utils/constants'
import { cpu } from 'node-os-utils'
import ms from 'ms'

export default class Stats extends Command {
    constructor() {
        super('stats', {
            aliases: ['stats', 'bot-info'],
            description: {
                content: 'Stats',
            },
            category: 'general',
        })
    }

    async exec(message) {
        const owner = this.client.users.cache.get(process.env.OWNER_ID)
        
        cpu.usage().then(cpu => {
            const statsEmbed = new MessageEmbed()
            .setAuthor(`${this.client.user.tag} (${this.client.user.id})`, this.client.user.displayAvatarURL())
            .setDescription('[Report an Issue](https://github.com/vBread/Wrizz/issues)')
            .addField('❯ General', stripIndents`
                • Servers: ${this.client.guilds.cache.size}
                • Users: ${this.client.users.cache.size}
                • Uptime: ${ms(this.client.uptime)}
                • Commands: ${this.client.commandHandler.aliases.map(a => a).length}`, true)
            .addField('❯ Technical', stripIndents`
                • Age: ${ms(Date.now() - this.client.user.createdAt)}
                • Bot Ping: ${this.client.ws.ping}ms
                • RAM Usage: ${(process.memoryUsage().heapUsed / 1e+6).toFixed(1)}mb
                • CPU Usage: ${cpu.toFixed(1)}%`, true)
            .addField('❯ Development', stripIndents`
                • Discord.js: [v12.3.1](https://github.com/discordjs/discord.js)
                • Framework: [Akairo](https://github.com/discord-akairo/discord-akairo)
                • Repository: [GitHub](https://github.com/vBread/Wrizz)
                • Hosting: [Digital Ocean](https://www.digitalocean.com/)`, true)
            .setFooter(`Developed by ${owner.tag}`, owner.displayAvatarURL())
            .setColor(COLORS.DEFAULT)

            return message.util.send(statsEmbed)
        })
    }
}