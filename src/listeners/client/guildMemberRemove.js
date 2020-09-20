import { Listener } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';

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
            .setColor('FC5C65')

			return this.client.channels.cache.get(memberlogs).send(embed);
		}
	}
}