import _ from 'chalk'
import { stripIndents } from 'common-tags'
import { sequelize } from '../models/index'

export const COLORS = {
    TIMESTAMP: timestamp => _.hex('#45C5B0')(timestamp),
    LABEL: label => _.hex('#4DC3FF')(label),
    INIT: init => _.hex('8BC84D')(init),
    DEBUG: debug => _.hex('FFC44D')(debug),
    ERROR: error => _.hex('EC0000')(error),
    WARN: warn => _.hex('FFA420')(warn),
    READY: ready => _.hex('8BC84D')(ready),
    DESTROY: destroy => _.hex('4DC3FF')(destroy),
    CONNECT: connect => _.hex('8BC84D')(connect),
    DISCONNECT: disconnect => _.hex('4DC3FF')(disconnect),
    AKAIRO: akairo => _.hex('872030')(akairo),
    DISCORD: discord => _.hex('7289DA')(discord),
    UNHANDLED_REJECTION: rejection => _.hex('FFA420')(rejection),
    _REDDIT: reddit => _.hex('FF5700')(reddit),

    DEFAULT: '249EA0',
    REDDIT: 'FF5700',
    0: '6C369D',
    10: '6C369D',
    20: 'F1C232',
    30: 'CC0300',
    LIGHTBEARER: '009FCC',
    GRAVEBORN: '006C04',
    MAULER: 'FFC300',
    WILDER: '4EF771',
    CELESTIAL: 'FEFEFE',
    HYPOGEAN: '7E00A0',
    DIMENSIONAL: '9498FF',
}

export const MESSAGES = {
    COMMAND_HANDLER: {
        PROMPT: {
            MODIFY_START: str => `${str}\n*Type \`cancel\` to cancel the command*`,
            MODIFY_RETRY: str => `${str}\n*Type \`cancel\` to cancel the command*`,
            TIMEOUT: 'Command timed out',
            CANCEL: 'Command cancelled'
        }
    },

    COMMANDS: {
        CONFIG: {
            PREFIX: {
                DESCRIPTION: 'Set the bot prefix',
                ERR_LENGTH: 'Prefix must be fewer than 5 characters',
                CURRENT: (guild, prefix) => `The current prefix for ${guild} is \`${prefix}\``,
                RESET: prefix => `Successfully reset the bot prefix to \`${prefix}\``,
                SUCCESS: prefix => `Successfully set the bot prefix to \`${prefix}\``
            }
        },

        GAME: {
            EMBLEMS: {
                DESCRIPTION: 'View the emblem requirements for SI level ups'
            },
            FURNITURE: {
                DESCRIPTION: 'View a hero\'s furniture ability upgrades',
                HERO: author => `${author}, which hero's furniture would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name ${hero} doesn't exist`
            },
            GUIDES: {
                DESCRIPTION: ''
            },
            HERO: {
                DESCRIPTION: 'View a hero\'s general info',
                NAME: author => `${author}, which hero would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name ${hero} doesn't exist`
            },
            MAP: {
                DESCRIPTION: stripIndents`
                    View the latest Arcane Labyrinth map or query a map by date
                    ❯ Accepted date strings
                    • YYYY-MM-DD
                    • MMM DD
                    • MMM DD YYYY`,

                ERR_FETCH: 'There was an error while fetching the latest map',
                ERR_NO_MAP: date => `Unable to find a map with a date of ${date}`,
                ERR_DATE: date => `${date} is an invalid date string`
            },
            SIGNATURE: {
                DESCRIPTION: 'View a hero\'s signature item upgrades',
                HERO: author => `${author}, which hero's signature item would you like to view?`,
                LEVEL: author => `${author}, which level unlock would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name ${hero} doesn't exist`,
                ERR_EXISTS2: (author, level) => `${author}, ${level} is an invalid level unlock`
            }
        },

        GENERAL: {
            HELP: {
                DESCRIPTION: 'View specific info on a command or a full list'
            },
            INVITE: {
                DESCRIPTION: 'Get an invite link for the bot'
            },
            REMIND: {
                DESCRIPTION: 'Set a custom reminder'
            },
            SERVER: {
                DESCRIPTION: 'View the server\'s info'
            },
            STATS: {
                DESCRIPTION: 'View the bot\s info'
            },
            USER: {
                DESCRIPTION: 'View a user\`s info',
            }
        },

        OWNER: {
            EVAL: {
                DESCRIPTION: 'Execute JS code'
            },
            GUILD: {
                DESCRIPTION: 'View the top 25 or less guilds'
            },
            KILL: {
                DESCRIPTION: 'Kill the current client session'
            },
            RELOAD: {
                DESCRIPTION: 'Reload a command or all',
                ALL: 'successfully reloaded all commands',
                SUCCESS: command => `successfully reloaded ${command}`
            }
        },

        TAGS: {
            DESCRIPTION: 'Custom commands created by users',
            INFO: prefix => `Use \`${prefix}help tag to view a list of availble tag methods\``,

            ADD: {
                DESCRIPTION: 'Create a custom command with content (text, markdown, attachments) of your choice, usable server-wide',
                NAME: author => `${author}, what would you like the name of the tag to be?`,
                CONTENT: author => `${author}, what would you like the content of the tag to be?`,
                SUCCESS: (name, prefix) => `Successfully created a new tag with the name \`${name}\`, use \`${prefix}${name}\` to try it out`,

                ERR_NAME_LENGTH: 'tag name must be fewer than 32 characters',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS: (author, name) => `${author}, a tag with the name/alias \`${name}\` already exists`,
            },
            ALIAS: {
                DESCRIPTION: 'Add another name to an exisiting tag',
                ADD: author => `${author}, what tag would you like to add an alias to?`,
                NAME: (author, name) => `${author}, what would you like the alias for \`${name}\` to be?`,
                DELETE: author => `${author}, what tag would you like to delete an alias from?`,
                SUCCESS: (name, alias, add) => `${add ? `Added alias \`${alias}\` to` : `Deleted alias \`${alias}\` from`} \`${name}\``,

                ERR_ALIAS_LENGTH: 'tag alias must be fewer than 32 characters',
                ERR_FLAGS: 'no flag provided, please use `--add/--del`',
                ERR_EXISTS: (author, name) => `${author}, a tag with the name/alias \`${name}\` already exists`,
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },
            DELETE: {
                DESCRIPTION: 'Delete an exisiting tag',
                NAME: author => `${author}, what tag would you like to delete?`,
                SUCCESS: name => `Successfully deleted tag \`${name}\``,

                ERR_AUTHOR: 'You can\'t delete a tag authored by another user',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },
            EDIT: {
                DESCRIPTION: 'Edit an existing tag\'s content',
                NAME: author => `${author}, what tag would you like to edit?`,
                CONTENT: (author, name) => `${author}, what would you like the new content for \`${name}\` to be?`,
                SUCCESS: name => `Successfully edited tag \`${name}\``,

                ERR_AUTHOR: 'you can\'t edit a tag authored by another user',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },
            SEARCH: {
                DESCRIPTION: 'Find a tag with a wildcard search that matches tag names and aliases',
                QUERY: author => `${author}, what tag would you like to ssearch for?`,

                ERR_NAME_LENGTH: 'tag name must be fewer than 32 characters',
            },
            SHOW: {
                DESCRIPTION: 'View a tag\'s content',
                NAME: author => `${author}, what tag would you like to view?`,
            }
        }
    }
}

export const QUERIES = {
    HERO: {
        SIGNATURE(hero) {
            const result = sequelize.query(
                `SELECT
                name,
                "si.skill", "si.description",
                "si.lv0", "si.lv10", "si.lv20", "si.lv30"
                FROM heroes
                WHERE name = '${hero}'`
            )
            return result
        },
        FURNITURE(hero) {
            const result = sequelize.query(
                `SELECT
                name,
                "fn.ability",
                "fn.lv3", "fn.lv9"
                FROM heroes
                WHERE name = '${hero}'`
            )
            return result
        },
        INFO(hero) {
            const result = sequelize.query(
                `SELECT
                name,
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
        }
    }
}

export const FUNCTIONS = {
    FLATTEN(array, value) {
        return array[0][0][value]
    },
    CLEAN(input) {
        if (typeof(input) === 'string') {
            return input
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g,  `@${String.fromCharCode(8203)}`);
        } else {
            return input;
        }
    }
}