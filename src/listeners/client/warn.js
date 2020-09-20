import { Listener } from 'discord-akairo'

export default class Warn extends Listener {
    constructor() {
        super('warm', {
            event: 'warn',
            emitter: 'client',
            category: 'client'
        })
    }

    exec(info) {
        this.client.log.warn(info)
    }
}