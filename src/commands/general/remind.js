import { Command } from 'discord-akairo'
import { Util } from 'discord.js'
import { MESSAGES, COLORS } from '../../utils/constants'
import moment from 'moment'
import ms from 'ms'
import { MessageEmbed } from 'discord.js'

export default class Reminder extends Command {
    constructor() {
        super('remind', {
            aliases: ['remind', 'set-reminder', 'remindme', 'rm'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.REMIND.DESCRIPTION,
                usage: '<duration> <note> [--ref=name]',
                examples: ['6h collect afk rewards', '30m labyrinth, arena, guild hunts --ref=daily reset']
            },
            category: 'general',
            args: [
                {

					id: 'duration',
					type: (_, num) => {
						if (!num) return null;
						if (ms(num) && !isNaN(ms(num))) return num
						return null;
					},
					prompt: {
						start: message => MESSAGES.COMMANDS.GENERAL.REMIND.DURATION(message.author),
						retry: (message, { phrase }) => MESSAGES.COMMANDS.GENERAL.REMIND.ERR_DURATION(message.author, phrase)
					},
                },
                {
                    id: 'content',
                    type: 'string',
                    match: 'rest',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GENERAL.REMIND.CONTENT(message.author)
                    }
                },
                {
                    id: 'reference',
                    type: 'string',
                    match: 'option',
                    flag: '--ref=',
                    default: message => `Reminder for ${message.member}`
                }
            ]
        });
    }

    async exec(message, { duration, content, reference }) {
        reference = Util.cleanContent(reference, message)

        if (reference && reference.length > 32) return message.util.reply(MESSAGES.COMMANDS.GENERAL.REMIND.ERR_REF_LENGTH)
        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.GENERAL.REMIND.ERR_CONTENT_LENGTH);

        content = Util.cleanContent(content, message);
        if (message.attachments.first()) content += `\n${message.attachments.first().url}`;

        const val = duration.match(/(?<=)\d(?=\w)/)
        const key = duration.match(/(?<=\d)[s|m|h|d]/);
        const time = new Date(moment().add(val, key)).getTime() || 0

        this.client.remind.add({
            author: message.author.id,
            guild_id: message.guild.id,
            channel_id: message.channel.id,
            content: content,
            reference: reference,
            start: Date.now(),
            end: time,
            id: Math.random()
        })

        const remEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle('Reminder Receipt')
        .addField('❯ Duration', `\`${ms(ms(duration), { long: true })}\` from now`)
        .addField('❯ Content', content)
        .setColor(COLORS.DEFAULT)

        return message.author.send(remEmbed).catch(() => {
            message.util.reply(MESSAGES.COMMANDS.GENERAL.REMIND.SUCCESS(duration))
        })
    }
}