import { Command, PrefixSupplier } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from 'common-tags';
import { Factions, cmd } from '../utils/Constants';
import { AFK, Hero } from 'afk-arena'

export default class HeroInfo extends Command {
    public constructor() {
        super('hero', {
            aliases: ['hero'],
            description: {
                content: cmd.hero.description,
                usage: '<hero>',
                examples: ['athalia']
            },
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                }
            ]
        });
    }

    public async exec(message: Message, { name }) {
        const prefix = await (this.handler.prefix as PrefixSupplier)(message);
        if (!name) return;

        const hero = await new AFK(name).info() as Hero
        if (!hero) {
            return message.util?.send(cmd.hero.err_hero(name));
        }

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${hero.title}`)
            .setDescription(stripIndents`
                \`${prefix}si ${hero.name}\` to view the hero's signature item
                \`${prefix}fn ${hero.name}\` to view the hero's furniture ability`
            )
            .addField('Faction', hero.faction, true)
            .addField('Role', hero.role, true)
            .addField('Type', hero.type, true)
            .addField('Class', hero.class, true)
            .addField('Trait', hero.trait, true)
            .addField('Armor', hero.armor, true)
            .addField('Signature Item', hero.signature.name, true)
            .addField('Furniture Ability', hero.furniture.ability, true)
            .setColor(Factions[hero.faction]);

        return message.util?.send(embed);
    }
}
