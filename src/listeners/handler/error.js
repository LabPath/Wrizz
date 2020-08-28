import { Listener } from 'discord-akairo';
import { TYPE, EVENT } from '../../utils/logger'

export default class Error extends Listener {
	constructor() {
		super('error', {
			emitter: 'commandHandler',
			event: 'error',
			category: 'commandHandler',
		});
	}

	exec(error) {
		this.client.logger.error(error, { type: TYPE.AKAIRO, event: EVENT.ERROR });
	}
}