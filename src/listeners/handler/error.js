import { Listener } from 'discord-akairo';
import { TYPE, EVT } from '../../utils/logger'
import { CLRS } from '../../utils/constants';

export default class Error extends Listener {
	constructor() {
		super('error', {
			emitter: 'commandHandler',
			event: 'error',
			category: 'commandHandler',
		});
	}

	exec(error) {
		this.client.logger.error(error, {
            type: CLRS.AKAIRO(TYPE.AKAIRO),
            event: CLRS.ERROR(EVT.ERROR)
        });
	}
}