import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import moment from 'moment'
import { COLORS, MESSAGES } from '../../utils/constants';

export default class User extends Command {
    constructor() {
        super('user', {
            aliases: ['user', 'user-info'],
            category: 'general',
            description: {
                content: MESSAGES.COMMANDS.GENERAL.USER.DESCRIPTION,
                usage: '[user]'
            },
            args: [
                {
                    id: 'member',
                    match: 'content',
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
            • Created On: ${moment(user.createdAt).format('MMMM DD, YYYY')}
            • Status: ${user.presence.status}
            • Activity: ${presence.length ? presence[0].name : 'None'}`)
        .addField('❯ Server', stripIndents`
            • Joined On: ${moment(member.joinedAt).format('MMMM DD, YYYY')}
            • Nickname: ${member.nickname || 'None'}
            • Boost Since: ${member.premiumSince ? moment(member.premiumSince).format('MMMM DD, YYY') : 'N/A'}
            • Top Role: ${member.roles.highest}`)
        .setColor(COLORS.DEFAULT)

        if (presence[1]) {
            infoEmbed.addField('❯ Spotify', stripIndents`
                • Artist: ${presence[1].state}
                • Track: ${presence[1].details}
                • Album: ${presence[1].assets.largeText}`)
        }

        return message.util.send(infoEmbed);
    }
}