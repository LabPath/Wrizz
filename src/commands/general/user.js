import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import { CLRS, MESSAGES } from '../../utils/constants';
import moment from 'moment'

export default class User extends Command {
    constructor() {
        super('user', {
            aliases: ['user', 'user-info'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.USER.DESCRIPTION,
                usage: '[user]'
            },
            category: 'general',
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: message => message.member
                }
            ]
        });
    }

    async exec(message, { member }) {
        const { user } = member
        const presence = user.presence.activities

        const infoEmbed = new MessageEmbed()
        .setAuthor(`${user.tag} (${user.id})`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField('❯ General', stripIndents`
            • Created On: ${moment(user.createdAt).format('MMMM D, YYYY')}
            • Status: ${user.presence.status}
            • Activity: ${presence.length ? presence[0].name : 'None'}`)
        .addField('❯ Server', stripIndents`
            • Joined On: ${moment(member.joinedAt).format('MMMM D, YYYY')}
            • Nickname: ${member.nickname || 'None'}
            • Boost Since: ${member.premiumSince ? moment(member.premiumSince).format('MMMM D, YYY') : 'N/A'}
            • Top Role: ${member.roles.highest}`)
        .setColor(CLRS.DEFAULT)

        if (presence[1]) {
            infoEmbed.addField('❯ Spotify', stripIndents`
                • Artist: ${presence[1].state}
                • Track: ${presence[1].details}
                • Album: ${presence[1].assets.largeText}`)
        }

        return message.util.send(infoEmbed);
    }
}