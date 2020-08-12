import { Command } from 'discord-akairo'
import { MESSAGES } from '../../utils/constants'
import { PGSQL } from '../../utils/postgresql'

export default class Close extends Command {
    constructor() {
        super('close', {
            aliases: ['close'],
            description: {
                content: MESSAGES.COMMANDS.MOD.CLOSE.DESCRIPTION,
                usage: '<id>',
            },
            category: 'mod',
            args: [
                {
                    id: 'id',
                    type: 'string',
                    match: 'rest',
                }
            ]
        });
    }

    async exec(message, { id }) {
        message.delete()

        const suggestion = await PGSQL.SUGGEST.CLOSE(message.guild.id, id)
        
        if (!suggestion[0][0]) {
            return message.util.reply(MESSAGES.COMMANDS.MOD.CLOSE.ERR_EXISTS(id))
                .then(msg => msg.delete({ timeout: 10000 }))
        }

        const msg = await message.channel.messages.fetch(suggestion[0][0].messageID)
        msg.delete()

        return message.util.reply(MESSAGES.COMMANDS.MOD.CLOSE.SUCCESS(id))
            .then(msg => msg.delete({ timeout: 10000 }))
    }
}