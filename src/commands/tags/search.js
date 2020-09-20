import { Util } from 'discord.js';
import { Command } from 'discord-akairo';
import { MESSAGES, c } from '../../utils/constants';
import { MessageEmbed } from 'discord.js';

export default class TagSearch extends Command {
    constructor() {
		super('tag-search', {
            aliases: ['search', 'find'],
			description: {
				content: MESSAGES.COMMANDS.TAGS.SEARCH.DESCRIPTION,
				usage: '<query>',
            },
            category: 'tag',
			args: [
				{
                    id: 'name',
                    type: 'lowercase',
                    match: 'content',
					prompt: {
						start: message => MESSAGES.COMMANDS.TAGS.SEARCH.QUERY(message.author),
					},
				},
			],
		});
	}

	async exec(message, { name }) {
        const results = []

        name = Util.cleanContent(name, message);
		if (name.length > 32) return message.util.reply(MESSAGES.COMMANDS.TAGS.SEARCH.ERR_NAME_LENGTH)

        const result = await this.client.query.tagSearch(name, message)
        if (!result.length) return message.util.reply(MESSAGES.COMMANDS.TAGS.SEARCH.ERR_RESULTS(name))

        for (const tag of result) results.push(tag.name)

        const embed = new MessageEmbed()
        .addField(`Search Results: \`${name}\``, `\`${results.join('` `')}\``)
        .setColor(c.default)

		return message.util.send(embed)
	}
}