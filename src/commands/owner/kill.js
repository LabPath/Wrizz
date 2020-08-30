import { Command } from 'discord-akairo'
import { COLORS, MESSAGES } from '../../utils/constants';
import { TYPE, EVENT } from '../../utils/logger';

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
            type: COLORS.DISCORD(TYPE.DISCORD),
            event: COLORS.DESTROY(EVENT.DESTROY)
        })

        await this.client.destroy()
    }
}