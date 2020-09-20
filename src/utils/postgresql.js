import { sequelize } from '../models'
import { QueryTypes } from 'sequelize'
export default class Query {
    async authenticate() {
        try {
            await sequelize.authenticate()
        } catch (err) {
            throw new Error(err)
        }
    }

    heroType(hero) {
        return sequelize.query(`
            SELECT *
            FROM heroes
            WHERE LOWER(name) = '${hero}'
        `, { type: QueryTypes.SELECT }) || undefined
    }

    // reminderAdd(remind) {
    //     sequelize.query(`
    //         INSERT INTO reminders (
    //             author,
    //             guild_id,
    //             channel_id,
    //             _content,
    //             _start,
    //             _end
    //         )
    //         VALUES (
    //             '${remind.author}',
    //             '${remind.guild_id}',
    //             '${remind.channel_id}',
    //             '${remind.content}',
    //             '${remind.start}',
    //             '${remind.end}'
    //         )
    //     `)
    // }

    // reminderEnd(author) {
    //     sequelize.query(`
    //         DELETE
    //         FROM reminders
    //         WHERE author = '${author}'
    //     `, { type: QueryTypes.DELETE })
    // }

    settingsSet(id, data) {
        sequelize.query(`
            INSERT INTO settings (
                guild_id,
                settings
            )
            VALUES (
                '${id}',
                '${JSON.stringify(data)}'
            )
            ON CONFLICT 
            ON CONSTRAINT guild_id
            DO UPDATE
            SET settings = '${JSON.stringify(data)}'
        `)
    }

    suggestionAdd(author, guild, suggestID, msgID) {
        sequelize.query(`
            INSERT INTO suggestions (
                author,
                guild_id,
                message_id,
                suggest_id
            )
            VALUES (
                '${author}',
                '${guild}',
                '${msgID}',
                '${suggestID}'
            )
        `)
    }

    suggestionClose(guild, id) {
        return sequelize.query(`
            DELETE FROM suggestions
            WHERE suggest_id = '${id}'
            AND guild_id = '${guild}'
            RETURNING 
            suggest_id,
            message_id
        `, { type: QueryTypes.DELETE }) || undefined
    }

    tagAdd(name, content, message) {
        sequelize.query(`
            INSERT INTO tags (
                name, 
                content, 
                author, 
                guild_id,
                created_at,
                updated_at
            )
            VALUES (
                '${name}', 
                '${content}', 
                '${message.author.id}', 
                '${message.guild.id}',
                NOW(),
                NOW()
            )
        `, { type: QueryTypes.INSERT })
    }

    tagDelete(tag) {
        sequelize.query(`
            DELETE FROM tags
            WHERE id = ${tag.id}
        `, { type: QueryTypes.DELETE })
    }

    tagEdit(tag, content, message) {
        sequelize.query(`
            UPDATE tags
            SET content = '${content}',
                edits = ${tag.edits} + 1,
                updated_at = NOW()
            WHERE name = '${tag.name}'
            AND guild_id = '${message.guild.id}'
        `, { type: QueryTypes.SELECT })
    }

    tagSearch(name, message) {
        return sequelize.query(`
            SELECT *
            FROM tags
            WHERE guild_id = '${message.guild.id}'
            AND name LIKE '%${name}%' 
        `, { type: QueryTypes.SELECT })
    }

    tagShow(name, message) {
        return sequelize.query(`
            UPDATE tags
            SET uses = uses + 1
            WHERE guild_id = '${message.guild.id}'
            AND name = '${name}'
            RETURNING content
        `, { type: QueryTypes.SELECT }) || undefined
    }

    tagType(input, message) {
        return sequelize.query(`
            SELECT *
            FROM tags
            WHERE guild_id = '${message.guild.id}'
            AND name = '${input}'
        `, { type: QueryTypes.SELECT })
    }


    userAdd(user) {

    }

    userFetch(user) {
        return sequelize.query(`
            SELECT *
            FROM players
            WHERE author = '${user}'
        `) || undefined
    }
}