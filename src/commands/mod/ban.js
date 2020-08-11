import { Command, Argument } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import { COLORS, MESSAGES } from '../../utils/constants';
import moment from 'moment'
import { User } from 'discord.js';

export default class Ban extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: {
                content: MESSAGES.COMMANDS.MOD.BAN.DESCRIPTION,
                usage: '<member> [--days=number] [reason]'
            },
            category: 'mod',
            args: [
                {
                    id: 'member',
                    type: Argument.union('member', 'user', async (_, phrase) => {
                        const user = await this.client.users.fetch(phrase)
                        return user || null
                    }),
                    prompt: {
                        start: message => MESSAGES.COMMANDS.MOD.BAN.USER(message.author),
                        retry: message => MESSAGES.COMMANDS.MOD.BAN.ERR_EXISTS(message.author)
                    }
                },
                {
                    id: 'days',
                    type: 'integer',
                    match: 'option',
                    flag: ['--days=', '-d='],
                    default: 7
                },
                {
                    id: 'reason',
                    type: 'string',
                    match: 'rest',
                    default: 'Ban'
                }
            ]
        });
    }

    async exec(message, { member, days, reason }) {
        const user = message.member instanceof User ? message.member : message.member.user

        try {
            try {
                await message.member.send()
            } catch {}

            await message.guild.members.ban(user.id, {
                days: days,
                reason: reason || `Banned by ${message.author.tag}`
            })
        } catch (err) {
            return message.util.reply(MESSAGES.COMMANDS.MOD.BAN.ERROR)
        }

        return message.util.send();
    }
}