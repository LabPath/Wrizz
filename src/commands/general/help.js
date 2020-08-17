import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../utils/constants';
import { capitalCase } from 'change-case'

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
            const helpEmbed = new MessageEmbed()
            .setAuthor(`Command List  |  Prefix: ${prefix}`, this.client.user.displayAvatarURL())
            .setDescription('[Support Server](https://discord.gg/JCVtRpK)')
            .setColor(COLORS.DEFAULT)

            for (const category of this.handler.categories.values()) {
                helpEmbed.addField(`❯ ${capitalCase(category.id)}`, category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.aliases[0]}\``).join(' '))
            }
            return message.util.send(helpEmbed)
        }

        const cmdEmbed = new MessageEmbed()
        .setAuthor(`${capitalCase(cmd.category.id)}  |  ${prefix + cmd.aliases[0]}`)
        .setDescription(cmd.description.content)
        .addField('❯ Aliases', 
            cmd.aliases.length > 1 
                ? `\`${cmd.aliases.slice(1).join('` `')}\`` 
                : 'No Aliases')
        .setColor(COLORS.DEFAULT)

        if (cmd.description.hasOwnProperty('usage'))
        cmdEmbed.addField('❯ Usage', `\`${prefix + cmd.aliases[0]} ${cmd.description.usage}\``)

        if (cmd.description.hasOwnProperty('examples'))
        cmdEmbed.addField('❯ Examples', `${cmd.description.examples.map(ex => `\`${prefix + cmd.aliases[0]} ${ex}\`\n`).join(' ')}`)

        return message.util.send(cmdEmbed)
    }
}