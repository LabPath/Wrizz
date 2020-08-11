
import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class StaffRole extends Command {
	constructor() {
		super('staffrole', {
            aliases: ['staffrole', 'staff'],
			description: {
				content: MESSAGES.COMMANDS.CONFIG.STAFFROLE.DESCRIPTION,
				usage: '<role>',
				examples: ['@Staff', 'Admins'],
			},
			category: 'config',
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					id: 'role',
					match: 'content',
					type: 'role',
				},
			],
		});
	}

	async exec(message, { role }) {
        this.client.settings.set(message.guild, 'staffRole', role.id);
        
        try {
            return message.util.reply(MESSAGES.COMMANDS.CONFIG.STAFFROLE.SUCCESS(role.name));
        } catch {
            return message.util.reply(MESSAGES.COMMANDS.CONFIG.STAFFROLE.ERR_EXISTS(role.name));
        }
	}
}