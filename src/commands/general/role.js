
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
            flags: ['--join', '--leave']
		});
    }
    
    *args() {
        const join = yield {
            match: 'flag',
            flag: '--join'
        };

        const leave = yield {
            match: 'flag',
            flag: '--leave'
        };

        const role = yield join ? {
            type: 'role',
            match: 'rest',
            prompt: {
                start: message => MESSAGES.COMMANDS.GENERAL.ROLE.JOIN(message.author),
                retry: (message, { phrase }) => MESSAGES.COMMANDS.GENERAL.ROLE.ERR_EXISTS(message.author, phrase)
            }
        } : {
            type: 'role',
            match: 'rest',
            prompt: {
                start: message => MESSAGES.COMMANDS.GENERAL.ROLE.LEAVE(message.author),
                retry: (message, { phrase }) => MESSAGES.COMMANDS.GENERAL.ROLE.ERR_EXISTS(message.author, phrase)
            }
        }

        return { join, leave, role }
    }

	async exec(message, { join, leave, role }) {
        if (join) {
            try {
                message.delete()
                await message.member.roles.add(role)

                try {
                    await message.author.send(MESSAGES.COMMANDS.GENERAL.ROLE.SUCCESS(join, role.name))
                } catch {}
            } catch {
                const msg = await message.util.reply(MESSAGES.COMMANDS.GENERAL.ROLE.ERR_PERMS(role.name))
                msg.delete({ timeout: 5000 })
            }
        } else if (leave) {
            try {
                message.delete()
                await message.member.roles.remove(role)

                try {
                    await message.author.send(MESSAGES.COMMANDS.GENERAL.ROLE.SUCCESS(join, role.name))
                } catch {}
            } catch {
                const msg = await message.util.reply(MESSAGES.COMMANDS.GENERAL.ROLE.ERR_HAVE(role.name))
                msg.delete({ timeout: 5000 })
            }
        } else {
            return
        }
	}
}