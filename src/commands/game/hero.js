import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES, FUNCTIONS } from '../../utils/constants'
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
        .setAuthor(`${hero}  |  ${FUNCTIONS.FLATTEN(result, 'title')}`)
        .setDescription(stripIndents`
            *\`${prefix}si ${hero}\` to view the hero's signature item
            \`${prefix}fn ${hero}\` to view the hero's furniture ability*`)
        .addField('Faction', FUNCTIONS.FLATTEN(result, 'faction'), true)
        .addField('Role', FUNCTIONS.FLATTEN(result, 'role'), true)
        .addField('Type', FUNCTIONS.FLATTEN(result, 'type'), true)
        .addField('Class', FUNCTIONS.FLATTEN(result, 'class'), true)
        .addField('Trait', FUNCTIONS.FLATTEN(result, 'trait'), true)
        .addField('Armor', FUNCTIONS.FLATTEN(result, 'armor'), true)
        .addField('Signature Item', FUNCTIONS.FLATTEN(result, 'si.item'), true)
        .addField('Furniture Ability', FUNCTIONS.FLATTEN(result, 'fn.ability'), true)
        .setColor(COLORS[FUNCTIONS.FLATTEN(result, 'faction').toUpperCase()])

        return message.util.send(heroEmbed)
    }
}