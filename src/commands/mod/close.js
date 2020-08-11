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
        const closed = await PGSQL.SUGGEST.CLOSE(message.guild.id, id)
        
        if (!closed[0][0]) {
            return message.util.reply(MESSAGES.COMMANDS.MOD.CLOSE.ERR_EXISTS(id))
        }

        return message.util.reply(MESSAGES.COMMANDS.MOD.CLOSE.SUCCESS(id))
    }
}