import { Listener } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { COLORS } from '../../utils/constants'
import moment from 'moment'

export default class GuildMemberAdd extends Listener {
	constructor() {
		super('guildMemberAdd', {
			emitter: 'client',
            event: 'guildMemberAdd',
            category: 'client'
		});
	}

	exec(member) {
        const memberlogs = this.client.settings.get(member.guild, 'memberlogs');

		if (memberlogs) {
			const embed = new MessageEmbed()
            .setAuthor(`${member.user.tag} | ${member.id}`, member.user.displayAvatarURL())
            .setTimestamp(new Date())
            .setFooter(`Join | ${member.guild.memberCount} Members`)
            .setColor(COLORS.JOIN)

			return this.client.channels.cache.get(memberlogs).send(embed);
		}
	}
}