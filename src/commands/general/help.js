import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { MESSAGES, c, capital as C } from '../../utils/constants';

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.HELP.DESCRIPTION,
                usage: '[command|alias]'
            },
            category: 'general',
            args: [
                {
                    id: 'cmd',
                    type: 'commandAlias',
                },
            ]
        })
    }

    async exec(message, { cmd }) {
        const prefix = this.handler.prefix(message)

        if (!cmd) {
            const embed = new MessageEmbed()
            .setAuthor(`Command List  |  Prefix: ${prefix}`, this.client.user.displayAvatarURL())
            .setColor(c.default)

            for (const category of this.handler.categories.values()) {
                embed.addField(`❯ ${C(category.id)}`, category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.aliases[0]}\``).join(' '))
            }
            return message.util.send(embed)
        }

        const cmdEmbed = new MessageEmbed()
        .setAuthor(`${C(cmd.category.id)}  |  ${prefix + cmd.aliases[0]}`)
        .setDescription(cmd.description.content)
        .addField('❯ Aliases', 
            cmd.aliases.length > 1
                ? `\`${cmd.aliases.slice(1).join('` `')}\`` 
                : 'No Aliases')
        .setColor(c.default)

        if (cmd.description.usage)
        cmdEmbed.addField('❯ Usage', `\`${prefix + cmd.aliases[0]} ${cmd.description.usage}\``)

        if (cmd.description.examples)
        cmdEmbed.addField('❯ Examples', `${cmd.description.examples.map(ex => `\`${prefix + cmd.aliases[0]} ${ex}\`\n`).join(' ')}`)

        return message.util.send(cmdEmbed)
    }
}