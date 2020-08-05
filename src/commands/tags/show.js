import { Command } from 'discord-akairo';
import { Util } from 'discord.js';
import { MESSAGES } from '../../utils/constants';
import { sequelize } from '../../models/index'
import { Op } from 'sequelize'

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

        const tag = await sequelize.models.tags.findOne({
            where: {
                [Op.or]: [{ name: name }, { aliases: name }],
                guildID: message.guild.id
            }
        })

        if (!tag) return

        await tag.increment('uses')
		return message.util.send(tag.content);
	}
}