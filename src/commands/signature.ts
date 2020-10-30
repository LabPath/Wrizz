import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { Factions, Levels, cmd } from '../utils/Constants';
import { AFK, Hero } from 'afk-arena'

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

    public async exec(message: Message, { name, level }) {
        if (!name) return;

        const Unlocks = {
            '0': 'default',
            '10': 'unlock1',
            '20': 'unlock2',
            '30': 'unlock3'
        }

        const hero = await new AFK(name).info() as Hero
        if (!hero) {
            return message.util?.send(cmd.signature.err_hero(name));
        }

        const { signature } = hero

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${signature.item}`)
            .setDescription(`*${signature.description}*`)
            .addField(`${level !== '0' ? `+${level} Unlock` : 'Unlock'}  |  ${signature.skill}`, signature[Unlocks[level]])
            .setColor(Levels[level]);

        if (level === 'all') {
            embed.fields = [];
            embed
                .addField('Unlock', signature.default)
                .addField('+10 Unlock', signature.unlock1)
                .addField('+20 Unlock', signature.unlock2)
                .addField('+30 Unlock', signature.unlock3)
                .setColor(Factions[hero.faction]);
        }

        return message.util?.send(embed);
    }
}
