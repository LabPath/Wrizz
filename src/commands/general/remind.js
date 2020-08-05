import { Command } from 'discord-akairo'
import { Util } from 'discord.js'
import { MESSAGES } from '../../utils/constants'
import { sequelize } from '../../models/index'
import moment from 'moment'
import ms from 'ms'

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
						retry: message => MESSAGES.COMMANDS.GENERAL.REMIND.ERR_DURATION(message.author),
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

        const val = duration.match(/(?<=).\d(?=\w)/)
        const key = duration.match(/(?<=\d)[s|m|h|d]/);
        const time = new Date(moment().add(val, key)).getTime() || 0

        this.client.remind.add({
            guildID: message.guild.id,
            channelID: message.channel.id,
            userID: message.author.id,
            reference: reference,
            content: content,
            startAt: Date.now(),
            endAt: time
        })
    }
}