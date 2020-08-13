import { Command } from 'discord-akairo';
import { MESSAGES, COLORS } from '../../utils/constants';
import moment from 'moment'
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';

export default class TagInfo extends Command {
    constructor() {
		super('tag-info', {
            aliases: ['info'],
			category: 'tag',
			description: {
				content: MESSAGES.COMMANDS.TAGS.INFO.DESCRIPTION,
				usage: '<tag>',
			},
			args: [
				{
					id: 'tag',
                    type: 'tag',
                    match: 'content',
					prompt: {
                        start: message => MESSAGES.COMMANDS.TAGS.INFO.NAME(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.TAGS.INFO.ERR_EXISTS(message.author, phrase)
					},
				},
			],
		});
	}

	async exec(message, { tag }) {
        const author = await this.client.users.fetch(tag.author)
        const guild = await this.client.guilds.cache.get(tag.guild_id)

        const infoEmbed = new MessageEmbed()
        .setAuthor(`${author.tag}  |  ${guild.name}`, author.displayAvatarURL())
        .setTitle(tag.name)
        .addField('❯ Aliases', 
            tag.aliases.length 
                ? `\`${tag.aliases.join('` `')}\`` 
                : 'No Aliases')
        .addField('❯ Counts', stripIndents`
            • Uses: ${tag.uses}
            • Edits: ${tag.edits}`)
        .addField('❯ Created At', moment(tag.created_at).format('MM/DD/YYYY @ HH:mm:ss'))
        .addField('❯ Updated At', moment(tag.updated_at).format('MM/DD/YYYY @ HH:mm:ss'))

        .setColor(COLORS.DEFAULT)

		return message.util.send(infoEmbed);
	}
}