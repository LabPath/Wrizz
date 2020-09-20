import { Command } from 'discord-akairo';
import { MESSAGES, c } from '../../utils/constants';
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags'
import moment from 'moment'

export default class Server extends Command {
	constructor() {
		super('server', {
			aliases: ['server', 'server-info', 'guild'],
			description: {
				content: MESSAGES.COMMANDS.GENERAL.SERVER.DESCRIPTION,
			},
			category: 'general',
		});
    }

    async exec(message) {
        const guild = message.guild
        const filter = query => guild.members.cache.filter(_ => _.presence.status === query).size

        const embed = new MessageEmbed()
        .setAuthor(`${guild.name} | ${guild.id}`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setDescription(`${guild.premiumSubscriptionCount} Boosts`)
        .addField('❯ General', stripIndents`
            • Region: ${guild.region}
            • Owner: ${guild.owner}
            • Emojis: ${guild.emojis.cache.size}
            • Roles: ${guild.roles.cache.size}
            • Channels: ${guild.channels.cache.filter(_ => _.type !== 'category').size}`, true)
        .addField('❯ Members', stripIndents`
            • Total: ${guild.memberCount}
            • Online: ${filter('online')}
            • Offline: ${filter('offline')}
            • Idle: ${filter('idle')}
            • DnD: ${filter('dnd')}`, true)
        .setFooter(`Created On: ${moment(guild.createdAt).format('MMMM D, YYYY  |  dddd, hh:mm A')}`)
        .setColor(c.default)

        return message.util.send(embed);
    }
}