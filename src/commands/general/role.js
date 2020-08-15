
import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class Role extends Command {
	constructor() {
		super('role', {
            aliases: ['role', 'self-assign'],
			description: {
				content: MESSAGES.COMMANDS.GENERAL.ROLE.DESCRIPTION,
				usage: '<role>',
				examples: ['@role', 'rolename'],
			},
            category: 'general',
            args: [
                {
                    id: 'role',
                    type: 'role',
                    match: 'content',
                }
            ]
		});
    }
    
	async exec(message, { role }) {
        if (!role) return message.delete()

        const hasRole = message.member.roles.cache.has(role.id)

        if (!hasRole) {
            try {
                message.delete()
                await message.member.roles.add(role)

                try {
                    await message.author.send(MESSAGES.COMMANDS.GENERAL.ROLE.SUCCESS(hasRole, role.name))
                } catch {}
            } catch {}
        } else {
            try {
                message.delete()
                await message.member.roles.remove(role)

                try {
                    await message.author.send(MESSAGES.COMMANDS.GENERAL.ROLE.SUCCESS(hasRole, role.name))
                } catch {}
            } catch {}
        }
	}
}