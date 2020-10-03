import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { cmd, levels, factions } from '../utils/Constants';
import { sql } from '../utils/PostgreSQL';

export default class Signature extends Command {
    constructor() {
        super('signature', {
            aliases: ['signature', 'si', 'sig'],
            description: {
                content: cmd.signature.description,
                usage: '<hero> [-=l, --level=]',
                examples: ['eironn, rowan --level=20, shemira -l=30']
            },
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                },
                {
                    id: 'level',
                    type: (_, num) => {
                        if (!num) return null;
                        if (!['all', '0', '10', '20', '30'].includes(num)) return null;
                        return num;
                    },
                    match: 'option',
                    flag: ['--level=', '-lvl='],
                    default: 'all'
                }
            ]
        });
    }

    async exec(message: Message, { name, level }) {
        if (!name) return;

        const [hero] = await sql`
            SELECT *
            FROM heroes
            WHERE LOWER(name) = ${name}`;

        if (!hero) {
            return message.util?.send(cmd.signature.err_hero(name));
        }

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${hero.si_name}`)
            .setDescription(`*${hero.si_desc}*`)
            .addField(
                `${level !== '0' ? `+${level} Unlock` : 'Unlock'}  |  ${hero.si_skill}`,
                hero[`si_lvl${level}`]
            )
            .setColor(levels[level]);

        if (level === 'all') {
            embed.fields = [];
            embed
                .addField('Unlock', hero.si_lvl0)
                .addField('+10 Unlock', hero.si_lvl10)
                .addField('+20 Unlock', hero.si_lvl20)
                .addField('+30 Unlock', hero.si_lvl30)
                .setColor(factions[hero.faction]);
        }

        return message.util?.send(embed);
    }
}
