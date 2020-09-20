import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags';
import { c } from '../../utils/constants';
import moment from 'moment'

export default class Guilds extends Command {
    constructor() {
        super('guilds', {
            aliases: ['guilds'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'guild',
                    type: 'guild',
                    match: 'option',
                    flag: ['--lookup=', '-id=']
                }
            ]
        })
    }

    async exec(message, { guild }) {
        const guilds = this.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)

        const listEmbed = new MessageEmbed()
        .setColor(c.default)

        if (guild) {
            listEmbed
                .setAuthor(`${guild.name} | ${guild.id}`, guild.iconURL())
                .setThumbnail(guild.owner.user.displayAvatarURL())
                .setDescription(stripIndents`
                    • ${guild.owner.user.tag} | ${guild.owner.user.id}
                    • Joined On: ${moment(guild.joinedAt).format('MMMM D, YYYY')}
                    • Created On: ${moment(guild.createdAt).format('MMMM D, YYYY')}`)
                .setFooter(`${guild.members.cache.filter(_ => _.presence.status === 'online').size} Online • ${guild.memberCount} Members`)
            return message.util.send(listEmbed)
        }

        const guildArr = []
        for (let i = 0; guilds.size > 25 ? i < 25 : i < guilds.size; i++) {
            guildArr.push(`• ${guilds.map(g => g.name)[i]} (${guilds.map(g => g.id)[i]})`)
        }

        listEmbed.setDescription(guildArr)
        return message.util.send(listEmbed)
    }
}