import { sequelize } from "../models"

export const PGSQL = {
    HERO: {
        FURNITURE(hero) {
            const result = sequelize.query(`
                SELECT name,
                       fn_ability,
                       fn_lv3, 
                       fn_lv9
                FROM heroes
                WHERE name = '${hero}'
            `)
            return result
        },

        INFO(hero) {
            const result = sequelize.query(`
                SELECT name,
                       title,
                       faction,
                       role,
                       type,
                       class,
                       trait,
                       armor,
                       si_item,
                       fn_ability
                FROM heroes
                WHERE name = '${hero}'`
            )
            return result || null
        },

        SIGNATURE(hero) {
            const result = sequelize.query(`
                SELECT name,
                       si_item,
                       si_skill, 
                       si_desc,
                       si_lv0, 
                       si_lv10, 
                       si_lv20, 
                       si_lv30
                FROM heroes
                WHERE name = '${hero}'
            `)
            return result
        },

        TYPE(phrase) {
            const result = sequelize.query(`
                SELECT *
                FROM heroes
                WHERE LOWER(name) = '${phrase}'
            `)
            return result || null
        }
    },

    PROFILE: {
        ADD(user) {

        },

        FETCH(user) {
            const result = sequelize.query(`
                SELECT *
                FROM players
                WHERE author = '${user}'
            `)
            return result || null
        }
    },

    REMINDERS: {
        ADD(remind) {
            sequelize.query(`
                INSERT INTO reminders (
                    author,
                    guild_id,
                    channel_id,
                    reference,
                    _content,
                    _start,
                    _end
                )
                VALUES (
                    '${remind.author}',
                    '${remind.guild_id}',
                    '${remind.channel_id}',
                    '${remind.reference}',
                    '${remind.content}',
                    '${remind.start}',
                    '${remind.end}'
                )
            `)
        },

        FINISH(author) {
            sequelize.query(`
                DELETE
                FROM reminders
                WHERE author = '${author}'
            `)
        },
    
        FORGET(remind) {
            sequelize.query(`
                DELETE
                FROM reminders
                WHERE author = '${remind.author}'
            `)
        },
    },

    SETTINGS: {
        SET(id, data) {
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
    },

    SUGGEST: {
        NEW(author, guild, suggestID, msgID) {
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
        },

        CLOSE(guild, id) {
            const result = sequelize.query(`
                DELETE FROM suggestions
                WHERE suggest_id = '${id}'
                AND guild_id = '${guild}'
                RETURNING 
                suggest_id,
                message_id
            `)
            return result || false
        }
    },

    TAGS: {
        ADD(name, content, message) {
            sequelize.query(`
                INSERT INTO tags (
                    author, 
                    guild_id,
                    name, 
                    aliases, 
                    content, 
                    created_at,
                    updated_at
                )
                VALUES (
                    '${name}', 
                    '[]', 
                    '${content}', 
                    '${message.author.id}', 
                    '${message.guild.id}',
                    NOW(),
                    NOW()
                )
            `)
        },

        ALIAS(tag) {
            sequelize.query(`
                UPDATE tags
                SET aliases = '${[JSON.stringify(tag.aliases)]}'
                WHERE name = '${tag.name}'
            `)
        },

        DELETE(tag) {
            sequelize.query(`
                DELETE FROM tags
                WHERE id = ${tag.id}
            `)
        },

        EDIT(tag, content, message) {
            sequelize.query(`
                UPDATE tags
                SET content = '${content}',
                    edits = ${tag.edits} + 1,
                    updated_at = NOW()
                WHERE name = '${tag.name}'
                AND guild_id = '${message.guild.id}'
            `)
        },

        SEARCH(name, message) {
            const result = sequelize.query(`
                SELECT *
                FROM tags
                WHERE guild_id = '${message.guild.id}'
                AND name LIKE '%${name}%' 
                OR array_to_string(
                    ARRAY[aliases], ','
                ) LIKE '%${name}%'
            `)
            return result
        },

        SHOW(name, message) {
            const result = sequelize.query(`
                UPDATE tags
                SET uses = uses + 1
                WHERE guild_id = '${message.guild.id}'
                AND name = '${name}'
                OR aliases @> '["${name}"]'
                RETURNING content
            `)
            return result || false
        },

        TYPE(phrase, message) {
            const result = sequelize.query(`
                SELECT *
                FROM tags
                WHERE guild_id = '${message.guild.id}'
                AND name = '${phrase}'
                OR aliases @> '["${phrase}"]'
            `)
            return result
        }
    }
}