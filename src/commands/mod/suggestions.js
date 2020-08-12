import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class SuggestionsChannel extends Command {
	constructor() {
		super('suggestions', {
			aliases: ['suggestions', 'suggest-channel'],
			description: {
                content: MESSAGES.COMMANDS.MOD.SUGGESTIONS.DESCRIPTION,
                usage: '<channel|channelID>',
                examples: ['#suggestions', '712725388106661961']
			},
			category: 'mod',
            userPermissions: ['MANAGE_GUILD'],
            args: [
                {
                    id: 'channel',
                    type: 'textChannel',
                    match: 'content',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.MOD.SUGGESTIONS.CHANNEL(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.MOD.SUGGESTIONS.ERR_EXISTS(message.author, phrase)
                    }
                }
            ]
		});
	}

	async exec(message, { channel }) {
        this.client.settings.set(message.guild, 'suggestChannel', channel.id)
        return message.util.reply(MESSAGES.COMMANDS.MOD.SUGGESTIONS.SUCCESS(channel.name))
	}
}