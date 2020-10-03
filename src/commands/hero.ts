import { Command, PrefixSupplier } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from 'common-tags';
import { cmd, factions } from '../utils/Constants';
import { sql } from '../utils/PostgreSQL';

export default class Hero extends Command {
    constructor() {
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

    async exec(message: Message, { name }) {
        const prefix = await (this.handler.prefix as PrefixSupplier)(message);
        if (!name) return;

        const [hero] = await sql`
            SELECT *
            FROM heroes
            WHERE LOWER(name) = ${name}`;

        if (!hero) {
            return message.util?.send(cmd.hero.err_hero(name));
        }

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${hero.title}`)
            .setDescription(stripIndents`
                *\`${prefix}si ${hero.name}\` to view the hero's signature item
                \`${prefix}fn ${hero.name}\` to view the hero's furniture ability*`
            )
            .addField('Faction', hero.faction, true)
            .addField('Role', hero.role, true)
            .addField('Type', hero.type, true)
            .addField('Class', hero.class, true)
            .addField('Trait', hero.trait, true)
            .addField('Armor', hero.armor, true)
            .addField('Signature Item', hero.si_name, true)
            .addField('Furniture Ability', hero.fn_ability, true)
            .setColor(factions[hero.faction]);

        return message.util?.send(embed);
    }
}
