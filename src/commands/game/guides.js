import { Command } from 'discord-akairo'
import { MESSAGES } from '../../utils/constants'
import { paginate } from '../../utils/paginator'

export default class Guides extends Command {
    constructor() {
        super('guides', {
            aliases: ['guides'],
            description: {
                content: MESSAGES.COMMANDS.GAME.GUIDES.DESCRIPTION,
            },
            category: 'game',
        })
    }

    async exec(message) {
        paginate(message, [
            
        ])
    }
}