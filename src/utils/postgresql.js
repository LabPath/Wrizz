import { sequelize } from "../models"

export const PGSQL = {
    HERO: {
        FURNITURE(hero) {
            const result = sequelize.query(`
                SELECT name,
                       "fn.ability",
                       "fn.lv3", 
                       "fn.lv9"
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
                       "si.item",
                       "fn.ability"
                FROM heroes
                WHERE name = '${hero}'`
            )
            return result || null
        },

        SIGNATURE(hero) {
            const result = sequelize.query(`
                SELECT name,
                       "si.skill", 
                       "si.description",
                       "si.lv0", 
                       "si.lv10", 
                       "si.lv20", 
                       "si.lv30"
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
                    "guildID",
                    "channelID",
                    "userID",
                    reference,
                    content,
                    "startAt",
                    "endAt"
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
                WHERE "userID" = '${remind.userID}'
            `)
        },
    
        FORGET(remind) {
            sequelize.query(`
                DELETE
                FROM reminders
                WHERE "userID" = '${remind.userID}'
            `)
        },
    },

    SETTINGS: {
        SET(id, data) {
            sequelize.query(`
                INSERT INTO settings (
                    "guildID", 
                    settings
                )
                VALUES (
                    '${id}', 
                    '${JSON.stringify(data)}'
                ) 
                ON CONFLICT ("guildID") 
                DO UPDATE 
                SET settings = '${JSON.stringify(data)}'
            `)
        }
    },

    SUGGEST: {
        NEW(author, guild, refID, msgID) {
            sequelize.query(`
                INSERT INTO suggestions (
                    "guildID",
                    "userID",
                    "reference",
                    "messageID"
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
                AND "guildID" = '${guild}'
                RETURNING 
                reference,
                "messageID"
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
                    "guildID",
                    "createdAt",
                    "updatedAt"
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
                SET aliases = '["${tag.aliases}"]'
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
                    updatedAt = NOW()
                WHERE name = '${tag.name}'
                AND "guildID" = '${message.guild.id}'
            `)
        },

        SEARCH(name, message) {
            const result = sequelize.query(`
                SELECT *
                FROM tags
                WHERE "guildID" = '${message.guild.id}'
                AND name LIKE '%${name}%' 
                OR array_to_string(ARRAY[aliases], ',') LIKE '%${name}%'
            `)
            return result
        },

        SHOW(name, message) {
            const result = sequelize.query(`
                UPDATE tags
                SET uses = uses + 1
                WHERE "guildID" = '${message.guild.id}'
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
                WHERE "guildID" = '${message.guild.id}'
                AND name = '${phrase}'
                OR aliases @> '["${phrase}"]'
            `)
            return result
        }
    }
}