import { Listener } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { CLRS } from '../../utils/constants'
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
            .setTimestamp(new Date())
            .setFooter(`Leave | ${member.guild.memberCount} Members`)
            .setColor(CLRS.LEAVE)

			return this.client.channels.cache.get(memberlogs).send(embed);
		}
	}
}