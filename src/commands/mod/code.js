import { Command } from 'discord-akairo'
import { MessageEmbed } from 'discord.js'
import { COLORS, MESSAGES } from '../../utils/constants'

export default class Code extends Command {
    constructor() {
        super('code', {
            aliases: ['code', 'add-code', 'new-code'],
            description: {
                content: '',
                usage: '<code> <expiration> <rewards>',
            },
            category: 'mod',
            args: [
                {
                    id: 'code',
                    match: '',
                    prompt: {
                        start: '',
                        retry: ''
                    }
                },
                {
                    id: 'expiration',
                    match: '',
                    prompt: {
                        start: '',
                        retry: ''
                    }
                },
                {
                    id: 'rewards',
                    match: '',
                    prompt: {
                        start: '',
                        retry: ''
                    }
                }
            ]
        })
    }

    async exec(message, { code, expiration, rewards }) {
        
    }
}