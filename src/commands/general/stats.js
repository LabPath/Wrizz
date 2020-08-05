import { Command } from 'discord-akairo'
import { cpu } from 'node-os-utils'
import { stripIndents } from 'common-tags'
import { MessageEmbed } from 'discord.js'
import { COLORS } from '../../utils/constants'
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
        const owner = message.guild.members.cache.get(process.env.OWNER_ID)

        cpu.usage().then(cpu => {
            const statsEmbed = new MessageEmbed()
            .setAuthor(`${message.client.user.tag} (${message.client.user.id})`, message.client.user.displayAvatarURL())
            .addField('❯ General', stripIndents`
                • Servers: ${message.client.guilds.cache.size}
                • Users: ${message.client.users.cache.size}
                • Uptime: ${ms(message.client.uptime)}
                • Commands: ${message.client.commandHandler.aliases.map(a => a).length}`, true)
            .addField('❯ Technical', stripIndents`
                • Age: ${ms(Date.now() - message.client.user.createdAt)}
                • Bot Ping: ${message.client.ws.ping}ms
                • RAM Usage: ${(process.memoryUsage().heapUsed / 1e+6).toFixed(1)}mb
                • CPU Usage: ${cpu.toFixed(1)}%`, true)
            .addField('❯ Development', stripIndents`
                • Discord.js: [v12.2.0](https://github.com/discordjs/discord.js)
                • Framework: [Akairo](https://github.com/discord-akairo/discord-akairo)
                • Repository: [GitHub](https://github.com/vBread/Wrizz)
                • Hosting: [Digital Ocean](https://www.digitalocean.com/)`, true)
            .setFooter(`Developed by ${owner.user.tag}`, owner.user.displayAvatarURL())
            .setColor(COLORS.DEFAULT)

            return message.util.send(statsEmbed)
        })
    }
}