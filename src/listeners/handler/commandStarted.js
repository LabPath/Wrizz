import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/log'
import { c } from '../../utils/constants';

export default class CommandStarted extends Listener {
	constructor() {
		super('commandStarted', {
			event: 'commandStarted',
			emitter: 'commands',
			category: 'handler',
		});
	}

	async exec(message, command, args) {
        this.client.log.info(`Command '${command.id}' ran by ${message.author.tag} [${Object.values(args)}]`, {
            type: c.akairo(TYPE.AKAIRO),
            event: c.cmd(EVT.COMMAND)
        });
	}
}