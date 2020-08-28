import { Listener } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { COLORS } from '../../utils/constants'
import moment from 'moment'

export default class GuildMemberRemove extends Listener {
	constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
            event: 'guildMemberRemove',
            category: 'client'
		});
	}

	exec(member) {
        const memberlogs = this.client.settings.get(member.guild, 'memberlogs');

		if (memberlogs) {
			const embed = new MessageEmbed()
            .setAuthor(`${member.user.tag} | ${member.id}`, member.user.displayAvatarURL())
            .setFooter(`${member.guild.memberCount} Members • ${moment().format('MMMM DD, YYYY - hh:mm:ss A')}`)
            .setColor(COLORS.LEAVE)

			return this.client.channels.cache.get(memberlogs).send(embed);
		}
	}
}