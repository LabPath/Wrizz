import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { cmd, factions } from '../utils/Constants';
import { sql } from '../utils/PostgreSQL';

export default class Furniture extends Command {
    constructor() {
        super('furniture', {
            aliases: ['furniture', 'fn'],
            description: {
                content: cmd.furniture.description,
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
        if (!name) return;

        const [hero] = await sql`
            SELECT *
            FROM heroes
            WHERE LOWER(name) = ${name}`;

        if (!hero) {
            return message.util?.send(cmd.furniture.err_hero(name));
        }

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${hero.fn_ability}`)
            .addField('3/3 Mythic Furniture', hero.fn_lvl3)
            .addField('9/9 Mythic Furniture', hero.fn_lvl9)
            .setColor(factions[hero.faction]);

        return message.util?.send(embed);
    }
}
