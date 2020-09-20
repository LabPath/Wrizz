import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js';
import { inspect } from 'util'
import { c, clean } from '../../utils/constants';
import { stripIndents } from 'common-tags'

export default class Eval extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            category: 'owner',
            ownerOnly: true,
            args: [
                {
                    id: 'code',
                    type: 'string',
                    match: 'content'
                }
            ]
        })
    }

    async exec(message, { code }) {
        const embed = new MessageEmbed()
        .setColor(c.default)

        try {
            let evaled = eval(code);

            if (typeof evaled !== 'string') {
                evaled = inspect(evaled)
                
                if (code.length + evaled.length >= 1900) {

                    if (evaled.length >= 1850) {
                        embed.setTitle('Output')
                        embed.setDescription(`\`\`\`js\n${clean(evaled)}\`\`\``)
                        
                        return message.util.send(embed);
                    }
                    return message.util.send('Character count exceeded')
                }

                embed.addField('❯ Input', `\`\`\`js\n${code}\`\`\``)
                embed.addField('❯ Ouput', `\`\`\`js\n${clean(evaled)}\`\`\``)

                return message.util.send(embed);
            }
        } catch (err) {
            embed.addField('❯ Input', `\`\`\`js\n${code}\`\`\``)
            embed.addField('❯ Error', `\`\`\`js\n${clean(err)}\`\`\``)

            return message.util.send(embed)
        }
    }
}