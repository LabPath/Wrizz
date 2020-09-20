import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { c, MESSAGES } from '../../utils/constants'

export default class Furniture extends Command {
    constructor() {
        super('furniture', {
            aliases: ['furniture', 'fn'],
            description: {
                content: MESSAGES.COMMANDS.GAME.FURNITURE.DESCRIPTION,
                usage: '<hero>',
            },
            category: 'game',
            args: [
                {
                    id: 'hero',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.FURNITURE.HERO(message.author),
                    }
                },
            ]
        })
    }

    async exec(message, { hero }) {
        const [exists] = this.client.query.heroType(hero, message)
        if (exists) return

        const embed = new MessageEmbed()
        .setAuthor(`${hero.name}  |  ${hero.fn_ability}`)
        .addField('3/3 Mythic Furniture', hero.fn_lv3)
        .addField('9/9 Mythic Furniture', hero.fn_lv9)
        .setColor(c[hero.faction.toLowerCase()])

        return message.util.send(embed)
    }
}