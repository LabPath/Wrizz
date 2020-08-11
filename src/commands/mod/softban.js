import { Command, Argument } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import { COLORS, MESSAGES } from '../../utils/constants';
import moment from 'moment'
import { User } from 'discord.js';

export default class Softban extends Command {
    constructor() {
        super('softban', {
            aliases: ['softban'],
            description: {
                content: MESSAGES.COMMANDS.MOD.SOFTBAN.DESCRIPTION,
                usage: '<member> [reason]'
            },
            category: 'mod',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.MOD.SOFTBAN.MEMBER(message.author),
                        retry: message => MESSAGES.COMMANDS.MOD.SOFTBAN.ERR_EXISTS(message.author)
                    }
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest',
                    default: 'Softban'
                }
            ]
        });
    }

    async exec(message, { member, reason }) {
        if (member instanceof User)

        try {
            try {
                await message.member.send('lalal')
            } catch {}

            await member.ban({
                days: 1,
                reason: reason || `Banned by ${message.author.tag}`
            })
        } catch (err) {
            return message.util.reply(MESSAGES.COMMANDS.MOD.SOFTBAN.ERROR)
        }

        return message.util.send('aaa');
    }
}