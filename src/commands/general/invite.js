import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../utils/constants';
import { stripIndents } from 'common-tags'

export default class Invite extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite', 'bot-invite'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.INVITE.DESCRIPTION,
            },
            category: 'general',
        })
    }

    async exec(message) {
        const invEmbed = new MessageEmbed()
        .setThumbnail(message.client.user.displayAvatarURL())
        .setTitle(process.env.INVITE_URL)
        .setDescription(stripIndents`
            • Currently active in ${message.client.guilds.cache.size} servers
            • Repository is located on [GitHub](https://github.com/vBread/Wrizz)
            • Join the [support server](https://discord.gg/JCVtRpK) for any issues`)
        .setColor(COLORS.DEFAULT)

        return message.author.send(invEmbed);
    }
}