import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class TagDelete extends Command {
    constructor() {
		super('tag-delete', {
            aliases: ['delete', 'del'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.DELETE.DESCRIPTION,
				usage: '<name>',
            },
            category: 'tag',
			args: [
				{
                    id: 'tag',
                    match: 'content',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.DELETE.NAME(message.author),
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        const [exists] = this.client.query.tagType(tag, message)
        if (exists) return
        
        if (tag.name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.ERR_LENGTH)
        if (tag.author !== message.author.id) return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.ERR_AUTHOR)

        await this.client.query.tagDelete(tag)

		return message.util.reply(MESSAGES.COMMANDS.TAGS.DELETE.SUCCESS(tag.name))
	}
}