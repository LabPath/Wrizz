import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class SetChannel extends Command {
	constructor() {
		super('setchannel', {
			aliases: ['setchannel'],
			description: {
                content: MESSAGES.COMMANDS.MOD.SETCHANNEL.DESCRIPTION,
                usage: '<type> <channel>',
                examples: ['1 #logs']
			},
			category: 'mod',
            userPermissions: ['MANAGE_GUILD'],
		});
    }
    
    *args() {
        const num = yield { 
            type: 'number',
            prompt: {
                start: message => {
                    return message.channel.send(MESSAGES.COMMANDS.MOD.SETCHANNEL.EMBED(message.author))
                },
                retry: (message, { phrase }) => MESSAGES.COMMANDS.MOD.SETCHANNEL.ERR_OPTION(message.author, phrase)
            }
        }

        const channel = yield num === 1 ? {
            type: 'textChannel',
            match: 'content',
            prompt: {
                start: message => MESSAGES.COMMANDS.MOD.SETCHANNEL.CHANNEL('Moderation Logs', message.author),
            }
        } : num === 2 ? {
            type: 'textChannel',
            match: 'content',
            prompt: {
                start: message => MESSAGES.COMMANDS.MOD.SETCHANNEL.CHANNEL('Member Logs', message.author),
            }
        } : {
            type: 'textChannel',
            match: 'content',
            prompt: {
                start: message => MESSAGES.COMMANDS.MOD.SETCHANNEL.CHANNEL('Suggestions', message.author),
            }
        };

        return { num, channel }
    }

	async exec(message, { num, channel }) {
        let key;

        num === 1 ? key = 'modlogs' :
        num === 2 ? key = 'memberlogs' :
        key = 'suggestions'

        this.client.settings.set(message.guild, key, channel.id)
        return message.util.reply(MESSAGES.COMMANDS.MOD.SETCHANNEL.SUCCESS(num, channel.name))
	}
}