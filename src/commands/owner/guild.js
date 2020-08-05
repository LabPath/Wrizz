import { Command } from 'discord-akairo'
import { COLORS, MESSAGES } from '../../utils/constants';
import { MessageEmbed } from 'discord.js'

export default class Guild extends Command {
    constructor() {
        super('guild', {
            aliases: ['guild', 'guild-info'],
            description: {
                content: MESSAGES.COMMANDS.OWNER.GUILD.DESCRIPTION,
                usage: '[--lookup=guild]'
            },
            category: 'owner',
            ownerOnly: true,
        })
    }

    async exec(message) {
        const guilds = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)

        const listEmbed = new MessageEmbed()
        .setColor(COLORS.DEFAULT)

        if (guilds.size < 10) {
            for (let i = 0; i < guilds.size; i++) {
                listEmbed.addField(`${i + 1}. ${guilds.map(g => g.name)[i]}`, guilds.map(g => g.id)[i])
            }
        } else {
            for (let i = 0; i < 25; i++) {
                listEmbed.addField(`${i + 1}. ${guilds.map(g => g.name)[i]}`, guilds.map(g => g.id)[i])
            }
        }

        return message.util.send(listEmbed)
    }
}