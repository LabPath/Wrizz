import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { cmd } from '../utils/Constants';

export default class Emblems extends Command {
    constructor() {
        super('emblems', {
            aliases: ['emblems'],
            description: {
                content: cmd.emblems.description
            }
        });
    }

    async exec(message: Message) {
        return message.util?.send({ files: ['./src/assets/images/emblems.png'] });
    }
}
