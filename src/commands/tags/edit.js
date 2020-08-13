import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES } from '../../utils/constants';
import { PGSQL } from '../../utils/postgresql';

export default class TagEdit extends Command {
	constructor() {
		super('tag-edit', {
            aliases: ['edit', 'modify'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.EDIT.DESCRIPTION,
				usage: '<name> <content>',
            },
            category: 'tag',
		});
	}

    *args() {
		const tag = yield {
			type: 'tag',
			prompt: {
				start: message => MESSAGES.COMMANDS.TAGS.EDIT.NAME(message.author),
				retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.EDIT.ERR_EXISTS2(message.author, phrase)},
		};

		const content = yield {
            type: 'string',
            match: 'rest',
            prompt: {
                start: message => MESSAGES.COMMANDS.TAGS.EDIT.CONTENT(message.author)
            },
        };

		return { tag, content };
	}

    async exec(message, { tag, content }) {
		if (tag.author !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_AUTHOR);
        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_CONTENT_LENGTH);

		if (content) {
            content = Util.cleanContent(content, message);
            
			if (message.attachments.first()) {
                content += `\n${message.attachments.first().url}`;
            }
		}

        await PGSQL.TAGS.EDIT(tag, content, message)
        
		return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.SUCCESS(tag.name));
	}
}