import { Listener } from 'discord-akairo';

export default class MessageInvalid extends Listener {
	constructor() {
		super('messageInvalid', {
			emitter: 'commandHandler',
			event: 'messageInvalid',
			category: 'handler',
		});
	}

	async exec(message) {
		if (message.guild && message.util.parsed.prefix) {
            if (!message.util.parsed.alias || !message.util.parsed.afterPrefix) return;
            
            const command = this.client.commandHandler.modules.get('tag-show');
            const parsed = await command.parse(message, message.util.parsed.afterPrefix)
			return this.client.commandHandler.runCommand(message, command, parsed)
		}
	}
}