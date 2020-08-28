import { Listener } from 'discord-akairo';
import { TYPE, EVENT } from '../../utils/logger';
import { COLORS } from '../../utils/constants'

export default class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        })
    }

    async exec() {
        this.client.logger.info(this.client.user.tag, {
            type: COLORS.DISCORD(TYPE.DISCORD),
            event: COLORS.READY(EVENT.READY)
        })

        await this.client.redditWatcher.init()
    }
}