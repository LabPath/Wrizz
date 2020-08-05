import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { sequelize } from '../../models/index'
import { MESSAGES } from '../../utils/constants';

export default class TagAdd extends Command {
    constructor() {
		super('tag-add', {
            aliases: ['add', 'create'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.ADD.DESCRIPTION,
				usage: '<name> <content>',
				examples: ['name lorem ipsum dolor sit amet'],
			},
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
					match: 'rest',
					type: 'string',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.ADD.CONTENT(message.author)
					},
				},
			],
		});
	}

	async exec(message, { name, content }) {
        name = Util.cleanContent(name.toLowerCase(), message);

		if (name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_NAME_LENGTH)
		if (content.length > 1850) return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.ERR_CONTENT_LENGTH);

        content = Util.cleanContent(content, message);
        if (message.attachments.first()) content += `\n${message.attachments.first().url}`;

        await sequelize.models.tags.create({
            name: name,
            aliases: [],
            content: content,
            author: message.author.id,
            guildID: message.guild.id,
        })

		return message.util.reply(MESSAGES.COMMANDS.TAGS.ADD.SUCCESS(name, this.handler.prefix(message)))
	}
}