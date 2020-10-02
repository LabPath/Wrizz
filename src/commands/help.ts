import { Command, PrefixSupplier } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { cmd } from '../utils/Constants';

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: cmd.help.description,
                usage: '[command|alias]'
            }
        });
    }

    async exec(message: Message, { cmd }) {
        const prefix = (this.handler.prefix as PrefixSupplier)(message);
        const embed = new MessageEmbed().setColor('249EA0');

        if (!cmd) {
            embed.setAuthor(`Command List  |  Prefix: ${prefix}`, this.client.user.displayAvatarURL());

            for (const category of this.handler.categories.values()) {
                embed.addField(
                    `❯ ${category.id}`,
                    category
                        .filter((c) => c.aliases.length > 0)
                        .map((c) => `\`${c.aliases[0]}\``)
                        .join(' ')
                );
            }
            return message.util?.send(embed);
        }

        const { aliases, description, category } = cmd;

        embed
            .setAuthor(`${category.id}  |  ${prefix + aliases[0]}`)
            .setDescription(description.content)
            .addField('❯ Aliases', aliases.length > 1 ? `\`${aliases.slice(1).join('` `')}\`` : 'No Aliases');

        if (description.usage) embed.addField('❯ Usage', `\`${prefix + aliases[0]} ${description.usage}\``);

        if (description.examples)
            embed.addField(
                '❯ Examples',
                `${description.examples.map((ex) => `\`${prefix + aliases[0]} ${ex}\`\n`).join(' ')}`
            );

        return message.util?.send(embed);
    }
}
