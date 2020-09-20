import { Command } from 'discord-akairo'
import { MESSAGES } from '../../utils/constants'

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

        const [suggestion] = await this.client.query.suggestionClose(message.guild.id, id)
        const logs = this.client.settings.get(message.guild, 'modlogs')

        if (!suggestion) {
            return message.util.reply(MESSAGES.COMMANDS.MOD.CLOSE.ERR_EXISTS(id))
                .then(msg => msg.delete({ timeout: 10000 }))
        }

        const msg = await message.channel.messages.fetch(suggestion.message_id)
        msg.delete()

        const channel = message.guild.channels.cache.get(logs)
        if (channel) return channel.send(MESSAGES.COMMANDS.MOD.CLOSE.SUCCESS(id, message.author)) // TODO: Embed
    }
}