import { Command } from 'discord-akairo'
import { MESSAGES, CLRS } from '../../utils/constants';
import { EVT } from '../../utils/logger';

export default class Reload extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'command',
                    type: 'commandAlias'
                }
            ]
        })
    }

    async exec({ command }) {

        if (!command) {
            this.client.commandHandler.reloadAll()
            return this.client.logger.info('Reloaded all commands', {
                type: CLRS.AKAIRO,
            })
        }

        this.client.commandHandler.reload(command)
        return this.client.logger.info(`Reloaded ${command}`, {
            type: CLRS.AKAIRO,
        })
    }
}