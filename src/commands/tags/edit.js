import { Util } from 'discord.js';
import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

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
			prompt: {
				start: message => MESSAGES.COMMANDS.TAGS.EDIT.NAME(message.author),
            }
		};

		const content = yield {
            type: 'string',
            match: 'rest',
            prompt: {
                start: message => MESSAGES.COMMANDS.TAGS.EDIT.CONTENT(message.author)
            }
        };

		return { tag, content };
	}

    async exec(message, { tag, content }) {
        const [exists] = this.client.query.tagType(tag, message)
        if (exists) return
        
        content = Util.cleanContent(content, message);

		if (tag.author !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_AUTHOR);
        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_CONTENT_LENGTH);
          
        if (message.attachments.first()) content += `\n${message.attachments.first().url}`;

        this.client.query.tagEdit(tag, content, message)
        
		return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.SUCCESS(tag.name));
	}
}