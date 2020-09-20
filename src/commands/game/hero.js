import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import { MESSAGES, c } from '../../utils/constants'
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
                    prompt: {
                        start: message => MESSAGES.COMMANDS.GAME.HERO.NAME(message.author),
                    }
                },
            ]
        })
    }

    async exec(message, { hero }) {
        const [exists] = this.client.query.heroType(hero, message)
        if (exists) return
        
        const prefix = this.handler.prefix(message)

        const embed = new MessageEmbed()
        .setAuthor(`${hero.name}  |  ${hero.title}`)
        .setDescription(stripIndents`
            *\`${prefix}si ${hero.name}\` to view the hero's signature item
            \`${prefix}fn ${hero.name}\` to view the hero's furniture ability*`)
        .addField('Faction', hero.faction, true)
        .addField('Role', hero.role, true)
        .addField('Type', hero.type, true)
        .addField('Class', hero.class, true)
        .addField('Trait', hero.trait, true)
        .addField('Armor', hero.armor, true)
        .addField('Signature Item', hero.si_item, true)
        .addField('Furniture Ability', hero.fn_ability, true)
        .setColor(c[hero.faction.toLowerCase()])

        return message.util.send(embed)
    }
}