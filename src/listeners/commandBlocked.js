import { Listener } from 'discord-akairo';

export default class CommandBlocked extends Listener {
	constructor() {
		super('commandBlocked', {
			emitter: 'commandHandler',
			event: 'commandBlocked',
			category: 'commandHandler',
		});
	}

	async exec() {
        return
    }
}