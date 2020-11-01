import { Command, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';
import { cmd } from '../utils/Constants';

export default class Prefix extends Command {
    public constructor() {
        super('prefix', {
            aliases: ['prefix'],
            userPermissions: ['MANAGE_GUILD'],
            description: {
                content: cmd.prefix.description,
                usage: '[prefix]',
                examples: ['?']
            },
            args: [
                {
                    id: 'prefix'
                }
            ]
        });
    }

    public async exec(message: Message, { prefix }) {
        if (!prefix) {
            return message.util?.send(
                cmd.prefix.current(await (this.handler.prefix as PrefixSupplier)(message))
            );
        }

        await this.client.sql`
            INSERT INTO settings (
                guild_id,
                prefix
            ) VALUES (
                ${message.guild.id!},
                ${prefix}
            ) ON CONFLICT
            ON CONSTRAINT guild_id
            DO UPDATE
            SET prefix = ${prefix}`;

        return message.util?.send(cmd.prefix.success(prefix));
    }
}
