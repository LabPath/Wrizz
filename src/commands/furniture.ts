import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { Factions, cmd } from '../utils/Constants';
import { AFK } from 'afk-arena'

export default class Furniture extends Command {
    public constructor() {
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

    public async exec(message: Message, { name }: { name: string }) {
        if (!name) return;

        const [hero] = await AFK.Hero.get(name)
        if (!hero) {
            return message.util?.send(cmd.furniture.err_hero(name));
        }

        const embed = new MessageEmbed()
            .setAuthor(`${hero.name}  |  ${hero.furniture.ability}`)
            .addField('3/3 Mythic Furniture', hero.furniture.unlock1)
            .addField('9/9 Mythic Furniture', hero.furniture.unlock2)
            .setColor(Factions[hero.faction]);

        return message.util?.send(embed);
    }
}
