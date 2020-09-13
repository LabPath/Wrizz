import { Command } from 'discord-akairo'
import { CLRS, MESSAGES } from '../../utils/constants';
import { TYPE, EVT } from '../../utils/logger';

export default class Kill extends Command {
    constructor() {
        super('kill', {
            aliases: ['kill', 'off'],
            category: 'owner',
            ownerOnly: true,
        })
    }

    async exec() {
        this.client.logger.info('Session killed', {
            type: CLRS.DISCORD(TYPE.DISCORD),
            event: CLRS.DESTROY(EVT.DESTROY)
        })

        await this.client.destroy()
    }
}