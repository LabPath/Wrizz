import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/log'
import { c } from '../../utils/constants';

export default class Error extends Listener {
	constructor() {
		super('error', {
			emitter: 'commands',
			event: 'error',
			category: 'commandHandler',
		});
	}

	exec(error) {
		this.client.log.error(error, {
            type: c.akairo(TYPE.AKAIRO),
            event: c.err(EVT.ERROR)
        });
	}
}