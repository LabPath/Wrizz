import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';
import { PGSQL } from '../../utils/postgresql';

export default class TagDelete extends Command {
    constructor() {
		super('tag-delete', {
            aliases: ['delete', 'del', 'remove'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.DELETE.DESCRIPTION,
				usage: '<name>',
            },
            category: 'tag',
			args: [
				{
                    id: 'tag',
                    type: 'tag',
                    match: 'content',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.DELETE.NAME(message.author),
						retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.DELETE.ERR_EXISTS2(message.author, phrase)
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        if (tag.name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.ERR_LENGTH)
        if (tag.author !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.ERR_AUTHOR)

        await PGSQL.TAGS.DELETE(tag)

		return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.SUCCESS(tag.name))
	}
}