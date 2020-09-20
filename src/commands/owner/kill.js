import { Command } from 'discord-akairo'
import { TYPE, EVT } from '../../utils/log';
import { c } from '../../utils/constants';
import _ from 'chalk'

export default class Kill extends Command {
    constructor() {
        super('kill', {
            aliases: ['kill', 'destroy'],
            category: 'owner',
            ownerOnly: true,
        })
    }

    async exec() {
        this.client.log.info('Session killed', {
            type: c.discord(TYPE.DISCORD),
            event: _.yellow(EVT.DESTROY)
        })

        this.client.destroy()
    }
}