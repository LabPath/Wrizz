import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import postgres, { Sql } from 'postgres';

declare module 'discord-akairo' {
    interface AkairoClient {
        commands: CommandHandler;
        listener: ListenerHandler;
        sql: Sql<any>
    }
}
export default class Wrizz extends AkairoClient {
    public readonly commands: CommandHandler;
    public readonly listener: ListenerHandler;
    public readonly sql: Sql<any> = postgres();

    public constructor() {
        super({ ownerID: process.env.OWNER_ID }, { disableMentions: 'everyone' });

        this.commands = new CommandHandler(this, {
            prefix: async (message: Message): Promise<string> => {
                const [guild] = await this.sql<{ prefix: string }>`
                    SELECT prefix
                    FROM settings
                    WHERE guild_id = ${message.guild.id}`

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

        this.start()
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

    public async start(): Promise<string> {
        await this.init();
        return this.login(process.env.TOKEN);
    }
}

new Wrizz();