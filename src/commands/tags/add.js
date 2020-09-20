import { Util } from 'discord.js';
import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class TagAdd extends Command {
    constructor() {
		super('tag-add', {
            aliases: ['add', 'create'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.ADD.DESCRIPTION,
				usage: '<name> <content>',
				examples: ['latin lorem ipsum dolor sit amet'],
            },
            category: 'tag',
			args: [
				{
					id: 'name',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.ADD.NAME(message.author)
					}
				},
				{
					id: 'content',
                    match: 'rest',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.ADD.CONTENT(message.author)
					}
				},
			],
		});
	}

	async exec(message, { name, content }) {
        const [existing] = await this.client.query.tagType(name, message)
        if (existing) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_EXISTS(name))
        
        const prefix = this.handler.prefix(message)
        name = Util.cleanContent(name.toLowerCase(), message);

		if (name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_NAME_LENGTH)
		if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_CONTENT_LENGTH);

        content = Util.cleanContent(content, message);
        if (message.attachments.first()) content += `\n${message.attachments.first().url}`;

        await this.client.query.tagAdd(name, content, message)

		return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.SUCCESS(name, prefix))
	}
}