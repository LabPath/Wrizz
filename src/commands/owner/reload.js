import { Command } from 'discord-akairo'
import { MESSAGES } from '../../utils/constants';

export default class Reload extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            ownerOnly: true,
            description: {
                content: MESSAGES.COMMANDS.OWNER.RELOAD.DESCRIPTION,
                usage: '[command]'
            },
            category: 'owner',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        })
    }

    async exec(message, { command }) {

        if (!command) {
            this.client.commandHandler.reloadAll()
            return message.util.reply(MESSAGES.COMMANDS.OWNER.RELOAD.ALL)
        }

        this.client.commandHandler.reload(command)
        return message.util.reply(MESSAGES.COMMANDS.OWNER.RELOAD.SUCCESS(command))
    }
}