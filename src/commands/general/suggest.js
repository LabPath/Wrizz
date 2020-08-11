import { Command } from 'discord-akairo'
import { Util } from 'discord.js'
import { MESSAGES, COLORS } from '../../utils/constants'
import { MessageEmbed } from 'discord.js'
import { PGSQL } from '../../utils/postgresql'
import moment from 'moment'
import id from 'crypto-random-string'

export default class Suggest extends Command {
    constructor() {
        super('suggest', {
            aliases: ['suggest', 'suggestion'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.REMIND.DESCRIPTION,
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
        const channel = message.guild.channels.cache.find(_ => _.name === 'suggestions')
        
        if (message.channel.id !== channel.id) {
            return message.util.reply(MESSAGES.COMMANDS.GENERAL.SUGGEST.ERR_CHANNEL)
        }

        const _id = id({ length: 6 })

        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.GENERAL.SUGGEST.ERR_CONTENT_LENGTH);
        content = Util.cleanContent(content, message);

        const suggestEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(content)
        .setFooter(`ID: ${_id} | ${moment().format('MMMM DD, YYYY @ HH:mm:ss')}`)
        .setColor(COLORS.DEFAULT)

        if (message.attachments.first()) suggestEmbed.setImage(message.attachments.first().url)

        const msg = await message.util.send(suggestEmbed)
        await msg.react('🔼')
        await msg.react('🔽')

        await PGSQL.SUGGEST.NEW(message.author.id, message.guild.id, _id)
    }
}