import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from 'common-tags';
import { cmd } from '../utils/Constants';

export default class Guides extends Command {
    public constructor() {
        super('guides', {
            aliases: ['guides'],
            description: {
                content: cmd.guides.description
            }
        });
    }

    public async exec(message: Message) {
        const base = 'https://www.reddit.com/r/whitesushii/wiki/index'

        const embed = new MessageEmbed()
            .setAuthor('Guides', 'https://imgur.com/tLARjuI.jpg', 'https://www.reddit.com/r/whitesushii/')
            .setDescription(stripIndents`
                • [Index](${base})
                • [General](${base}#wiki_general)
                • [Mechanics](${base}#wiki_mechanics)
                • [Gameplay](${base}#wiki_gameplay)
                • [Events](${base}#wiki_events)`)
            .setColor(0xFEFEFE);

        return message.util?.send(embed);
    }
}
