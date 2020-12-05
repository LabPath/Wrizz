import { Command, PrefixSupplier } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import { cmd } from '../utils/Constants';

interface CommandOption {
    flags: string
    description: string
}
export default class Help extends Command {
    public constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: cmd.help.description,
                usage: '[command]',
                examples: ['furniture']
            },
            args: [
                {
                    id: 'cmd',
                    type: 'commandAlias'
                }
            ]
        });
    }

    public async exec(message: Message, { cmd }: { cmd: Command }) {
        const prefix = await (this.handler.prefix as PrefixSupplier)(message);
        const embed = new MessageEmbed().setColor(0xFEFEFE);

        if (!cmd) {
            embed.setAuthor(`Command List | Prefix: ${prefix}`, this.client.user.displayAvatarURL());

            for (const category of this.handler.categories.values()) {
                embed.setDescription(
                    category.filter((cmd) => cmd.aliases.length > 0)
                    .map((cmd) => `\`${cmd.aliases[0]}\``).join(' ')
                )
            }

            return message.util?.send(embed);
        }

        const { aliases, description } = cmd;

        embed
            .setAuthor(`${prefix + aliases[0]} ${aliases.length > 1 ? `(${aliases.slice(1).join(', ')})` : ''}`)
            .setDescription(description.content)

        if (description.options.length > 0) {
            embed.addField('❯ Options', description.options.map((opt: CommandOption) => `\`${opt.flags}\`\n${opt.description}`))
        }
            
        if (description.usage) {
            embed.addField('❯ Usage', `\`${prefix + aliases[0]} ${description.usage}\``);
        }
            
        if (description.examples) {
            embed.addField('❯ Examples', description.examples.map((ex: string) => `\`${prefix + aliases[0]} ${ex}\`\n`).join(' '));
        }

        return message.util?.send(embed);
    }
}
