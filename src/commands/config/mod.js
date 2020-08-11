import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class Mod extends Command {
	constructor() {
		super('mod', {
			aliases: ['mod'],
			description: {
				content: MESSAGES.COMMANDS.CONFIG.MOD.DESCRIPTION,
			},
			category: 'config',
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	async exec(message) {
        const admin = this.client.settings.get(message.guild, 'modFeatures')
        
        if (admin) {
            this.client.settings.set(message.guild, 'modFeatures', false)
            return message.util.reply(MESSAGES.COMMANDS.CONFIG.MOD.DISABLED)
        } else {
            this.client.settings.set(message.guild, 'modFeatures', true)
            return message.util.reply(MESSAGES.COMMANDS.CONFIG.MOD.ENABLED)
        }
	}
}