import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { Factions, Levels, cmd, Unlocks } from '../utils/Constants';
import { AFK } from 'afk-arena'

export default class Signature extends Command {
    public constructor() {
        super('signature', {
            aliases: ['signature', 'si', 'sig'],
            description: {
                content: cmd.signature.description,
                options: [
                    {
                        flag: '[-l=, --level=]',
                        description: cmd.signature.options
                    }
                ],
                usage: '<hero> [-l=, --level=]',
                examples: ['eironn', 'rowan --level=20', 'shemira -l=30']
            },
            args: [
                {
                    id: 'name',
                    type: 'lowercase'
                },
                {
                    id: 'level',
                    type: (_, num: string) => {
                        if (!num || !['0', '10', '20', '30'].includes(num)) {
                            return null;
                        }

                        return num;
                    },
                    match: 'option',
                    flag: ['--level=', '-lvl=']
                }
            ]
        });
    }

    public async exec(message: Message, { name, level }: { name: string, level: string }) {
        if (!name) return;

        const [hero] = await AFK.Hero.get(name)
        if (!hero) {
            return message.util?.send(cmd.signature.err_hero(name));
        }

        const { signature } = hero

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name} | ${signature.name}`)
            .setDescription(`*${signature.description}*`)
            .addField(`${level !== '0' ? `+${level} Unlock` : 'Unlock'} | ${signature.skill}`, signature[Unlocks[level]])
            .setColor(Levels[level]);

        if (!level) {
            embed.fields = [];
            embed
                .addField('Unlock', signature.unlock)
                .addField('+10 Unlock', signature.unlock1)
                .addField('+20 Unlock', signature.unlock2)
                .addField('+30 Unlock', signature.unlock3)
                .setColor(Factions[hero.faction]);
        }

        return message.util?.send(embed);
    }
}
