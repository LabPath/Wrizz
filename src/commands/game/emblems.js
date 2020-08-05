import { Command } from 'discord-akairo'
import { MESSAGES } from '../../utils/constants'

export default class Emblems extends Command {
    constructor() {
        super('emblems', {
            aliases: ['emblems'],
            description: {
                content: MESSAGES.COMMANDS.GAME.EMBLEMS.DESCRIPTION,
            },
            category: 'game',
        })
    }

    async exec(message) {
        return message.util.send({ files: ['./src/assets/images/emblems.png'] })
    }
}