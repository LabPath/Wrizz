import { Inhibitor } from 'discord-akairo';

export default class StaffRole extends Inhibitor {
	constructor() {
		super('staffRole', {
			reason: 'staffRole'
		});
	}

	async exec(message) {
        if (!message.guild) return false
        if (message.util.parsed.command.categoryID !== 'mod') return false

        const isOwner = message.member.id === process.env.OWNER_ID
        if (isOwner) return false

        const role = this.client.settings.get(message.guild, 'staffRole')
        if (!role) return true

        const isStaff = message.member.roles.cache.has(role) 
        if (!isStaff) return true

        return false
    }
}