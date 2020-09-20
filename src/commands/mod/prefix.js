import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class Prefix extends Command {
	constructor() {
		super('prefix', {
			aliases: ['prefix', 'set-prefix'],
			description: {
				content: MESSAGES.COMMANDS.MOD.PREFIX.DESCRIPTION,
				usage: '[prefix] [--reset]',
			},
			category: 'mod',
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					id: 'prefix',
					type: 'string',
                },
                {
                    id: 'reset',
                    match: 'flag',
                    flag: '--reset'
                }
			],
		});
	}

	async exec(message, { prefix, reset }) {
		if (!prefix && !reset) return message.util.send(MESSAGES.COMMANDS.MOD.PREFIX.CURRENT(message.guild.name, this.handler.prefix(message)));
        if (!reset && prefix.length > 3) return message.util.send(MESSAGES.COMMANDS.MOD.PREFIX.ERR_LENGTH)

        if (reset) {
            this.client.settings.set(message.guild, 'prefix', process.env.PREFIX);
            return message.util.send(MESSAGES.COMMANDS.MOD.PREFIX.RESET(process.env.PREFIX));
        } else {
            this.client.settings.set(message.guild, 'prefix', prefix);
            return message.util.send(MESSAGES.COMMANDS.MOD.PREFIX.SUCCESS(prefix));
        }
	}
}