import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES, flatten } from '../../utils/constants'
import { PGSQL } from '../../utils/postgresql'
import { stripIndents } from 'common-tags'
export default class Hero extends Command {
    constructor() {
        super('hero', {
            aliases: ['hero', 'hero-info'],
            description: {
                content: MESSAGES.COMMANDS.GAME.HERO.DESCRIPTION,
                usage: '<hero>',
            },
            category: 'game',
            args: [
                {
                    id: 'hero',
                    type: 'hero',
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.HERO.NAME(message.author),
                        retry: (message, { phrase }) => MESSAGES.COMMANDS.GAME.HERO.ERR_EXISTS(message.author, phrase)
                    }
                },
            ]
        })
    }

    async exec(message, { hero }) {
        const result = await PGSQL.HERO.INFO(hero)
        const prefix = this.handler.prefix(message)

        const heroEmbed = new MessageEmbed()
        .setAuthor(`${hero}  |  ${flatten(result, 'title')}`)
        .setDescription(stripIndents`
            *\`${prefix}si ${hero}\` to view the hero's signature item
            \`${prefix}fn ${hero}\` to view the hero's furniture ability*`)
        .addField('Faction', flatten(result, 'faction'), true)
        .addField('Role', flatten(result, 'role'), true)
        .addField('Type', flatten(result, 'type'), true)
        .addField('Class', flatten(result, 'class'), true)
        .addField('Trait', flatten(result, 'trait'), true)
        .addField('Armor', flatten(result, 'armor'), true)
        .addField('Signature Item', flatten(result, 'si_item'), true)
        .addField('Furniture Ability', flatten(result, 'furniture'), true)
        .setColor(COLORS[flatten(result, 'faction').toUpperCase()])

        return message.util.send(heroEmbed)
    }
}