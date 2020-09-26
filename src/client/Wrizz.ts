import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { sql } from '../utils/postgresql';
import RedditClient from './structures/RedditClient';

export default class Wrizz extends AkairoClient {
    reddit: RedditClient;
    commands: CommandHandler;
    listener: ListenerHandler;

    constructor() {
        super({ ownerID: process.env.OWNER_ID }, { disableMentions: 'everyone' });

        this.reddit = new RedditClient(this);

        this.commands = new CommandHandler(this, {
            prefix: async (message: Message): Promise<any> => {
                const [guild] = await sql`
                    SELECT prefix
                    FROM settings
                    WHERE guild_id = ${message.guild.id!}
                `;

                if (guild) {
                    return guild.prefix;
                } else {
                    return process.env.PREFIX;
                }
            },
            directory: `${__dirname}/../commands`,
            allowMention: true,
            handleEdits: true,
            commandUtil: true
        });

        this.listener = new ListenerHandler(this, {
            directory: `${__dirname}/./listeners`
        });
    }

    async init() {
        this.commands.useListenerHandler(this.listener);
        this.listener.setEmitters({
            commands: this.commands,
            listener: this.listener
        });

        this.commands.loadAll();
        this.listener.loadAll();
        console.log('Modules loaded ✔️');

        await this.reddit.init();
        console.log('Connection established ✔️');
    }

    async start() {
        await this.init();
        return this.login(process.env.TOKEN);
    }
}

new Wrizz().start();
