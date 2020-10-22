import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { sql } from '../utils/PostgreSQL';

declare module 'discord-akairo' {
    interface AkairoClient {
        commands: CommandHandler;
        listener: ListenerHandler;
    }
}
export default class Wrizz extends AkairoClient {
    public commands: CommandHandler;
    public listener: ListenerHandler;

    public constructor() {
        super({ ownerID: process.env.OWNER_ID }, { disableMentions: 'everyone' });

        this.commands = new CommandHandler(this, {
            prefix: async (message: Message): Promise<any> => {
                const [guild] = await sql`
                    SELECT prefix
                    FROM settings
                    WHERE guild_id = ${message.guild.id!}`;

                return guild?.prefix ?? process.env.PREFIX;
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

    private async init(): Promise<void> {
        this.commands.useListenerHandler(this.listener);
        this.listener.setEmitters({
            commands: this.commands,
            listener: this.listener
        });

        this.commands.loadAll();
        this.listener.loadAll();
    }

    public async start(): Promise<any> {
        await this.init();
        return this.login(process.env.TOKEN);
    }
}

new Wrizz().start();
