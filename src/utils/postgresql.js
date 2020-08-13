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
                       si_skill, 
                       si_description,
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

    REMINDERS: {
        ADD(remind) {
            sequelize.query(`
                INSERT INTO reminders (
                    guild_id,
                    channel_id,
                    user_id,
                    reference,
                    content,
                    start,
                    end
                )
                VALUES (
                    '${remind.guildID}',
                    '${remind.channelID}',
                    '${remind.userID}',
                    '${remind.reference}',
                    '${remind.content}',
                    '${remind.startAt}',
                    '${remind.endAt}',
                )
            `)
        },

        FINISH(remind) {
            sequelize.query(`
                DELETE
                FROM reminders
                WHERE user_id = '${remind.userID}'
            `)
        },
    
        FORGET(remind) {
            sequelize.query(`
                DELETE
                FROM reminders
                WHERE user_id = '${remind.userID}'
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
                ON CONFLICT guild_id 
                DO UPDATE 
                SET settings = '${JSON.stringify(data)}'
            `)
        }
    },

    SUGGEST: {
        NEW(author, guild, refID, msgID) {
            sequelize.query(`
                INSERT INTO suggestions (
                    guild_id,
                    user_id,
                    reference,
                    message_id
                )
                VALUES (
                    '${guild}',
                    '${author}',
                    '${refID}',
                    '${msgID}'
                )
            `)
        },

        CLOSE(guild, id) {
            const result = sequelize.query(`
                DELETE FROM suggestions
                WHERE reference = '${id}'
                AND guild_id = '${guild}'
                RETURNING 
                reference,
                message_id
            `)
            return result || false
        }
    },

    TAGS: {
        ADD(name, content, message) {
            sequelize.query(`
                INSERT INTO tags (
                    name, 
                    aliases, 
                    content, 
                    author, 
                    guild_id,
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