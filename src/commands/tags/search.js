import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES, COLORS, flatten } from '../../utils/constants';
import { MessageEmbed } from 'discord.js';
import { PGSQL } from '../../utils/postgresql';

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

        const result = await PGSQL.TAGS.SEARCH(name, message)
        const tags = flatten(result)

        for (const tag of [tags]) {
            results.push(tag.name)
        }

        const resultEmbed = new MessageEmbed()
        .setTitle(`❯ Search results for \`${name}\``)
        .setDescription(results.length ? `\`${results.join('` `')}\`` : `No results found for \`${name}\``)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setColor(COLORS.DEFAULT)

		return message.util.send(resultEmbed)
	}
}