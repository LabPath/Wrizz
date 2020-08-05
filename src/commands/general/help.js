import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { COLORS, MESSAGES } from '../../utils/constants';
import { capitalCase } from 'change-case'

export default class Help extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: MESSAGES.COMMANDS.GENERAL.HELP.DESCRIPTION,
                usage: '[command]'
            },
            category: 'general',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                }
            ]
        })
    }

    async exec(message, { command }) {
        const prefix = this.handler.prefix(message)

        if (!command) {
            const helpEmbed = new MessageEmbed()
            .setAuthor('Command List', this.client.user.displayAvatarURL())
            .setColor(COLORS.DEFAULT)

            for (const category of this.handler.categories.values()) {
                helpEmbed.addField(`❯ ${capitalCase(category.id)}`, category.filter(cmd => cmd.aliases.length > 0).map(cmd => `\`${cmd.aliases[0]}\``).join(' '))
            }
            return message.util.send(helpEmbed)
        }

        const cmdEmbed = new MessageEmbed()
        .setAuthor(`${capitalCase(command.category.id)}  |  ${prefix + command.aliases[0]}`)
        .setDescription(command.description.content)
        .setColor(COLORS.DEFAULT)

        if (command.aliases.length > 1)
        cmdEmbed.addField('❯ Aliases', `\`${command.aliases.slice(1).join('` `')}\``)

        if (command.description.hasOwnProperty('usage'))
        cmdEmbed.addField('❯ Usage', `\`${prefix + command.description.usage}\``)

        if (command.description.hasOwnProperty('examples'))
        cmdEmbed.addField('❯ Examples', `${command.description.examples.map(ex => `\`${prefix + command.aliases[0]} ${ex}\`\n`).join(' ')}`)

        return message.util.send(cmdEmbed)
    }
}