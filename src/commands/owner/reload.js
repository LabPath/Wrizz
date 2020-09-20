import { Command } from 'discord-akairo'
import { TYPE, EVT } from '../../utils/log';
import { c } from '../../utils/constants';
import _ from 'chalk'

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
            this.client.commands.reloadAll()
            return this.client.log.info('Commands reloaded', {
                type: c.akairo(TYPE.AKAIRO),
                event: _.yellow(EVT.RELOAD)
            })
        }

        this.client.commands.reload(command)
        return this.client.log.info(`'${command}' reloaded`, {
            type: c.akairo(TYPE.AKAIRO),
            event: _.yellow(EVT.RELOAD)
        })
    }
}