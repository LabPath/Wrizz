import { Command } from 'discord-akairo';
import { sequelize } from '../../models/index'
import { MESSAGES } from '../../utils/constants';

export default class TagDelete extends Command {
    constructor() {
		super('tag-delete', {
            aliases: ['delete', 'del', 'remove'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.DELETE.DESCRIPTION,
				usage: '<name>',
			},
			args: [
				{
                    id: 'tag',
                    match: 'content',
					type: 'tag',
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
        if (tag.user !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.ERR_AUTHOR)

        await sequelize.models.tags.destroy({
            where: {
                id: tag.id
            }
        })

		return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.SUCCESS(tag.name))
	}
}