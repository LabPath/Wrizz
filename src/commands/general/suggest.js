import { Command } from 'discord-akairo'
import { Util } from 'discord.js'
import { MESSAGES, COLORS, randomID } from '../../utils/constants'
import { MessageEmbed } from 'discord.js'
import { PGSQL } from '../../utils/postgresql'
import moment from 'moment'

export default class Suggest extends Command {
    constructor() {
        super('suggest', {
            aliases: ['suggest', 'suggestion'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.SUGGEST.DESCRIPTION,
                usage: '<suggestion>',
                examples: ['do something cool']
            },
            category: 'general',
            args: [
                {
                    id: 'content',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GENERAL.SUGGEST.CONTENT(message.author)
                    }
                }
            ]
        });
    }

    async exec(message, { content }) {
        const channel = this.client.settings.get(message.guild, 'suggestChannel')
        
        if (!channel) {
            return message.util.reply(MESSAGES.COMMANDS.GENERAL.SUGGEST.DISABLED(message.guild.name))
        }

        if (message.channel.id !== channel) {
            return message.util.reply(MESSAGES.COMMANDS.GENERAL.SUGGEST.ERR_CHANNEL(channel))
        }

        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.GENERAL.SUGGEST.ERR_CONTENT_LENGTH);
        content = Util.cleanContent(content, message);

        const suggestEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(content)
        .setFooter(`ID: ${randomID(6)} | ${moment().format('MMMM DD, YYYY @ HH:mm:ss')}`)
        .setColor(COLORS.DEFAULT)

        if (message.attachments.first()) suggestEmbed.setImage(message.attachments.first().url)

        const msg = await message.util.send(suggestEmbed)
        await msg.react('🔼')
        await msg.react('🔽')
        
        await PGSQL.SUGGEST.NEW(message.author.id, message.guild.id, _id, msg.id)
    }
}