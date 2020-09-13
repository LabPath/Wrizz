import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/logger'
import { CLRS } from '../../utils/constants';

export default class CommandStarted extends Listener {
	constructor() {
		super('commandStarted', {
			emitter: 'commandHandler',
			event: 'commandStarted',
			category: 'handler',
		});
	}

	async exec(message, command, args) {
        this.client.logger.info(`Command '${command.id}' ran by ${message.author.tag} [${Object.values(args)}]`, {
            type: CLRS.AKAIRO(TYPE.AKAIRO),
            event: CLRS.COMMAND(EVT.COMMAND)
        });
	}
}