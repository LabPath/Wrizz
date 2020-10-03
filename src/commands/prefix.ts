import { Command, PrefixSupplier } from 'discord-akairo';
import { Message } from 'discord.js';
import { cmd } from '../utils/Constants';
import { sql } from '../utils/PostgreSQL';

export default class Prefix extends Command {
    constructor() {
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

    async exec(message: Message, { prefix }) {
        if (!prefix) {
            return message.util?.send(
                cmd.prefix.current(await (this.handler.prefix as PrefixSupplier)(message))
            );
        }

        await sql`
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
