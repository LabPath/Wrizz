import { Util } from 'discord.js';
import { Command } from 'discord-akairo';
import { MESSAGES } from '../../utils/constants';

export default class TagShow extends Command {
    constructor() {
		super('tag-show', {
            aliases: ['show', 'display'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.SHOW.DESCRIPTION,
				usage: '<tag>',
			},
			args: [
				{
					id: 'name',
                    type: 'lowercase',
                    match: 'content',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.SHOW.NAME(message.author),
					}
				},
			],
		});
	}

	async exec(message, { name }) {
        name = Util.cleanContent(name, message);

        const [tag] = await this.client.query.tagShow(name, message)
        if (!tag) return

		return message.util.send(tag.content);
	}
}