import { Command } from 'discord-akairo'
import { stripIndents } from 'common-tags'
import { inspect } from 'util'
import { MESSAGES, clean } from '../../utils/constants';

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
        try {
            let evaled = eval(code);

            if (typeof evaled !== 'string') {
                evaled = inspect(evaled)
                return message.util.send(stripIndents`
                    Input: \`\`\`js\n${code}\`\`\`
                    Output: \`\`\`js\n${clean(evaled)}\`\`\``);
            }
        } catch (err) {
            return message.util.send(stripIndents`
                Input: \`\`\`js\n${code}\`\`\`
                Error: \`\`\`js\n${clean(err)}\`\`\``)
        }
    }
}