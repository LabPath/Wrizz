import { Command } from 'discord-akairo'
import { MESSAGES, c } from '../../utils/constants'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'

export default class Guides extends Command {
    constructor() {
        super('guides', {
            aliases: ['guides'],
            description: {
                content: MESSAGES.COMMANDS.GAME.GUIDES.DESCRIPTION,
            },
            category: 'game',
        })
    }

    async exec(message) {
        
        const embed = new MessageEmbed()
        .setTitle('Guides & Resources')
        .addField('❯ Guides', stripIndents`
            • [General](https://bread.gitbook.io/guides/general)
            • [Mechanics](https://bread.gitbook.io/guides/mechanics)
            • [Gameplay](https://bread.gitbook.io/guides/gameplay)
            • [Events](https://bread.gitbook.io/guides/events)`, true)
        .addField('❯ Resources', stripIndents`
            • [Guide Collection](https://bread.gitbook.io/guides/)
            • [r/Whitesushii](https://www.reddit.com/r/whitesushii/)`, true)
        .setColor(c.default)

        message.util.send(embed)
    }
}