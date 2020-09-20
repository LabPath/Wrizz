import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/log';
import { c } from '../../utils/constants'

export default class Ready extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        })
    }

    async exec() {
        this.client.log.info(this.client.user.tag, { 
            type: c.discord(TYPE.DISCORD), 
            event: c.ready(EVT.READY)
        })
    }
}