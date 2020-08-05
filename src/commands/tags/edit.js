import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES } from '../../utils/constants';
import { sequelize } from '../../models';

export default class TagEdit extends Command {
	constructor() {
		super('tag-edit', {
            aliases: ['edit', 'modify'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.EDIT.DESCRIPTION,
				usage: '<name> <content>',
			},
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
            match: 'rest',
            type: 'string',
            prompt: {
                start: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.EDIT.CONTENT(message.author, phrase),
            },
        };

		return { tag, content };
	}

    async exec(message, { tag, content }) {
		if (tag.user !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_AUTHOR);
        if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.ERR_CONTENT_LENGTH);

		if (content) {
			content = Util.cleanContent(content, message);
			if (message.attachments.first()) content += `\n${message.attachments.first().url}`;
		}

		await sequelize.models.tags.update({
            content: content,
            edits: tag.edits++
        }, {
            where: {
                name: tag.name
            }
        })

		return message.util.reply(MESSAGES.COMMANDS.TAGS.EDIT.SUCCESS(tag.name));
	}
}