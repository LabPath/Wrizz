import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES } from '../../utils/constants';
import { PGSQL } from '../../utils/postgresql';

export default class TagAdd extends Command {
    constructor() {
		super('tag-add', {
            aliases: ['add', 'create'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.ADD.DESCRIPTION,
				usage: '<name> <content>',
				examples: ['name lorem ipsum dolor sit amet'],
            },
            category: 'tag',
			args: [
				{
					id: 'name',
					type: 'existingTag',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.ADD.NAME(message.author),
						retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.ADD.ERR_EXISTS(message.author, phrase)
					},
				},
				{
					id: 'content',
                    type: 'string',
                    match: 'rest',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.ADD.CONTENT(message.author)
					},
				},
			],
		});
	}

	async exec(message, { name, content }) {
        const prefix = this.handler.prefix(message)
        name = Util.cleanContent(name.toLowerCase(), message);

		if (name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_NAME_LENGTH)
		if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_CONTENT_LENGTH);

        content = Util.cleanContent(content, message);
        if (message.attachments.first()) content += `\n${message.attachments.first().url}`;

        await PGSQL.TAGS.ADD(name, content, message)

		return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.SUCCESS(name, prefix))
	}
}