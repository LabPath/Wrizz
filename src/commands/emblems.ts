import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { cmd } from '../utils/Constants';

export default class Emblems extends Command {
    public constructor() {
        super('emblems', {
            aliases: ['emblems'],
            description: {
                content: cmd.emblems.description
            }
        });
    }

    public async exec(message: Message) {
        return message.util?.send('https://imgur.com/Yn8XWw7.png');
    }
}
