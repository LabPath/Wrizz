import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { CLRS, MESSAGES, flatten } from '../../utils/constants'
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
        const prefix = this.handler.prefix(message)
        
        let result = await PGSQL.HERO.INFO(hero)
        result = flatten(result)

        const heroEmbed = new MessageEmbed()
        .setAuthor(`${hero}  |  ${result.title}`)
        .setDescription(stripIndents`
            *\`${prefix}si ${hero}\` to view the hero's signature item
            \`${prefix}fn ${hero}\` to view the hero's furniture ability*`)
        .addField('Faction', result.faction, true)
        .addField('Role', result.role, true)
        .addField('Type', result.type, true)
        .addField('Class', result.class, true)
        .addField('Trait', result.trait, true)
        .addField('Armor', result.armor, true)
        .addField('Signature Item', result.si_item, true)
        .addField('Furniture Ability', result.fn_ability, true)
        .setColor(CLRS[result.faction.toUpperCase()])

        return message.util.send(heroEmbed)
    }
}