import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/log'
import { c } from '../../utils/constants';

export default class CommandBlocked extends Listener {
	constructor() {
		super('commandBlocked', {
			event: 'commandBlocked',
			emitter: 'commands',
			category: 'handler',
		});
	}

	async exec(message, command, reason) {
        this.client.log.info(`Command '${command.id}' blocked from ${message.author.tag} [${reason}]`, {
            type: c.akairo(TYPE.AKAIRO),
            event: c.cmd(EVT.COMMAND)
        });
	}
}