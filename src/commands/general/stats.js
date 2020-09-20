import { dependencies as deps } from '../../../package.json'
import { stripIndents } from 'common-tags'
import { MessageEmbed } from 'discord.js'
import { Command } from 'discord-akairo'
import { c } from '../../utils/constants'
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
        const { owner } = await this.client.fetchApplication()

        const embed = new MessageEmbed()
        .setAuthor(`${this.client.user.tag} (${this.client.user.id})`, this.client.user.displayAvatarURL())
        .setDescription('[Report an Issue](https://github.com/vBread/Wrizz/issues)')
        .addField('❯ General', stripIndents`
            • Age: ${ms(Date.now() - this.client.user.createdAt)}
            • Users: ${this.client.users.cache.size}
            • Uptime: ${ms(this.client.uptime)}
            • Servers: ${this.client.guilds.cache.size}
            • Commands: ${this.client.commands.aliases.map(a => a).length}`, true)
        .addField('❯ Development', stripIndents`
            • Hosting: [Digital Ocean](https://www.digitalocean.com/)
            • Discord.js: [${deps['discord.js'].replace('^', 'v')}](https://github.com/discordjs/discord.js)
            • Framework: [Akairo](https://github.com/discord-akairo/discord-akairo)
            • Repository: [GitHub](https://github.com/vBread/Wrizz)
            • RAM Usage: ${(process.memoryUsage().heapUsed / 1e+6).toFixed(1)}mb`, true)
        .setFooter(`Developed by ${owner.tag}`, owner.displayAvatarURL())
        .setColor(c.default)

        return await message.util.send(embed)
    }
}

// • Ping: ${this.client.ws.ping}ms