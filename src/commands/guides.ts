import { Command } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { stripIndents } from 'common-tags';
import { cmd } from '../utils/Constants';

export default class Guides extends Command {
    constructor() {
        super('guides', {
            aliases: ['guides'],
            description: {
                content: cmd.guides.description
            }
        });
    }

    async exec(message: Message) {
        const embed = new MessageEmbed()
            .setTitle('Guides & Resources')
            .addField(
                '❯ Guides',
                stripIndents`
            • [General](https://bread.gitbook.io/guides/general)
            • [Mechanics](https://bread.gitbook.io/guides/mechanics)
            • [Gameplay](https://bread.gitbook.io/guides/gameplay)
            • [Events](https://bread.gitbook.io/guides/events)`,
                true
            )
            .addField(
                '❯ Resources',
                stripIndents`
            • [Guide Collection](https://bread.gitbook.io/guides/)
            • [r/Whitesushii](https://www.reddit.com/r/whitesushii/)`,
                true
            )
            .setColor('249EA0');

        return message.util?.send(embed);
    }
}
