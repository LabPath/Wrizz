import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES, flatten } from '../../utils/constants';
import { PGSQL } from '../../utils/postgresql'

export default class TagShow extends Command {
    constructor() {
		super('tag-show', {
            aliases: ['show', 'display', 'view'],
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
					},
				},
			],
		});
	}

	async exec(message, { name }) {
        name = Util.cleanContent(name, message);

        const result = await PGSQL.TAGS.SHOW(name, message)
        if (!result[0][0]) return

        const tag = flatten(result, 'content')

		return message.util.send(tag);
	}
}