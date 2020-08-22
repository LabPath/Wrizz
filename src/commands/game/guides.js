import { Command } from 'discord-akairo'
import { MESSAGES, COLORS } from '../../utils/constants'
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
        const guideEmbed = new MessageEmbed()
        .setTitle('Guides & Resources')
        .setDescription(stripIndents`
            " *dude this list is getting longer than cvs receipts* "
            — Bread`)
        .addField('❯ Guides', stripIndents`
            • [General](https://app.gitbook.com/@bread/s/guides/relevant-guides/general)
            • [Mechanics](https://app.gitbook.com/@bread/s/guides/relevant-guides/mechanics)
            • [Gameplay](https://app.gitbook.com/@bread/s/guides/relevant-guides/gameplay)
            • [Events](https://app.gitbook.com/@bread/s/guides/relevant-guides/events)`, true)
        .addField('❯ Resources', stripIndents`
            • [Guide Collection](https://app.gitbook.com/@bread/s/guides/)
            • [r/Whitesushii](https://www.reddit.com/r/whitesushii/)`, true)
        .setColor(COLORS.DEFAULT)

        message.util.send(guideEmbed)
    }
}