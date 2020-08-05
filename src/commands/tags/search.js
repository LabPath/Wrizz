import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { sequelize } from '../../models/index'
import { MESSAGES, COLORS } from '../../utils/constants';
import { Op } from 'sequelize';
import { MessageEmbed } from 'discord.js';

export default class TagSearch extends Command {
    constructor() {
		super('tag-search', {
            aliases: ['search', 'find'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.SEARCH.DESCRIPTION,
				usage: '<query>',
			},
			args: [
				{
                    id: 'name',
                    match: 'content',
					type: 'lowercase',
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

        const tags = await sequelize.models.tags.findAll({
            where: {
                [Op.or]: {
                    name: {
                        [Op.like]: `%${name}%`
                    },
                    aliases: {
                        [Op.contains]: [`${name}`]
                    }
                }
            }
        })

        for (const tag of tags) {
            results.push(tag.dataValues.name)
        }

        const resultEmbed = new MessageEmbed()
        .setTitle(`❯ Search results for \`${name}\``)
        .setDescription(results.length ? `\`${results.join('` `')}\`` : `No results found for \`${name}\``)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setColor(COLORS.DEFAULT)

		return message.util.send(resultEmbed)
	}
}