import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class Prefix extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix', 'set-prefix'],
			description: {
				content: MESSAGES.COMMANDS.CONFIG.PREFIX.DESCRIPTION,
				usage: '[prefix]',
			},
			category: 'config',
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					id: 'prefix',
					type: 'string',
				},
			],
		});
	}

	async exec(message, { prefix }) {
        const _default = this.handler.prefix(message)

		if (!prefix) return message.util.send(MESSAGES.COMMANDS.CONFIG.PREFIX.CURRENT(message.guild.name, _default));
        if (prefix.length > 5) return message.util.send(MESSAGES.COMMANDS.CONFIG.PREFIX.ERR_LENGTH)

        if (prefix === 'reset') {
            this.client.settings.set(message.guild, 'prefix', process.env.PREFIX);
            return message.util.send(MESSAGES.COMMANDS.CONFIG.PREFIX.RESET(_default));
        } else {
            this.client.settings.set(message.guild, 'prefix', prefix);
            return message.util.send(MESSAGES.COMMANDS.CONFIG.PREFIX.SUCCESS(prefix));
        }
	}
}