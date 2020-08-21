import _ from 'chalk'
import { stripIndents } from 'common-tags'
import ms from 'ms'

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
        GAME: {
            EMBLEMS: {
                DESCRIPTION: 'View the emblem requirements for SI level ups'
            },

            FURNITURE: {
                DESCRIPTION: 'View a hero\'s furniture ability upgrades',
                HERO: author => `${author}, which hero's furniture would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`
            },

            GUIDES: {
                DESCRIPTION: ''
            },

            HERO: {
                DESCRIPTION: 'View a hero\'s general info',
                NAME: author => `${author}, which hero would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`
            },

            MAP: {
                DESCRIPTION: stripIndents`
                    View the latest Arcane Labyrinth map or query a map by date
                    
                    ❯ Accepted date strings
                    • YYYY-MM-DD
                    • MMM DD
                    • MMM DD YYYY`,

                ERR_FETCH: 'There was an error while fetching the latest map',
                ERR_NO_MAP: date => `Unable to find a map with a date of \`${date}\``,
                ERR_DATE: date => `\`${date}\` is an invalid date string`
            },

            SIGNATURE: {
                DESCRIPTION: 'View a hero\'s signature item upgrades',
                HERO: author => `${author}, which hero's signature item would you like to view?`,
                LEVEL: author => `${author}, which level unlock would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`,
                ERR_EXISTS2: (author, level) => `${author}, \`${level}\` is an invalid level unlock`
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
                DESCRIPTION: 'Set a custom reminder',
                SUCCESS: time => `successfully set a reminder for \`${ms(ms(time), { long: true })}\``,
                FINISH: (user, content) => `${user}, reminder to\n> ${content}`,

                ERR_REF_LENGTH: 'reminder reference must be fewer than 32 characters',
                ERR_CONTENT_LENGTH: 'reminder content must be fewer than 1850 characters',
            },

            ROLE: {
                DESCRIPTION: 'Assign yourself a role',
                ADD: author => `${author}, what role would you like to join?`,
                LEAVE: author => `${author}, what role would you like to leave?`,
                SUCCESS: (hasRole, role) => `Successfully ${!hasRole ? 'joined' : 'left'} \`${role}\``,
            },

            SERVER: {
                DESCRIPTION: 'View the server\'s info'
            },

            STATS: {
                DESCRIPTION: 'View the bot\'s info'
            },

            SUGGEST: {
                DESCRIPTION: 'Suggest a feature',
                CONTENT: author => `${author}, what would you like to suggest?`,
                DISABLED: guild => `suggestions are disabled in \`${guild}\``,

                ERR_CONTENT_LENGTH: 'suggestion content must be fewer than 1850 characters',
                ERR_CHANNEL: channel => `you can only make suggestions in <#${channel}>`
            },

            USER: {
                DESCRIPTION: 'View a user\`s info',
            }
        },

        MOD: {
            CLOSE: {
                SUCCESS: id => `successfully closed suggestion \`${id}\``,

                ERR_EXISTS: id => `a suggestion with ID \`${id}\` doesn't exist`
            },

            PREFIX: {
                DESCRIPTION: 'Set the bot prefix',
                ERR_LENGTH: 'Prefix must be fewer than 3 characters',
                CURRENT: (guild, prefix) => `The current prefix for ${guild} is \`${prefix}\``,
                RESET: prefix => `Successfully reset the bot prefix to \`${prefix}\``,
                SUCCESS: prefix => `Successfully set the bot prefix to \`${prefix}\``
            },

            STAFFROLE: {
                DESCRIPTION: 'Set the staff role',
                SUCCESS: role => `successfully set the staff role to \`${role}\``,

                ERR_EXISTS: role => `a role with the name \`${role}\` doesn't exist`,
            },

            SUGGESTIONS: {
                DESCRIPTION: 'Set the suggestions channel',
                CHANNEL: author => `${author}, what channel would you like to limit suggestions to?`,
                SUCCESS: channel => `successfully set suggestion channel to \`#${channel}\``,

                ERR_EXISTS: (author, channel) => `${author}, a channel with the name/ID \`${channel}\` doesn't exist`
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
                SUCCESS: command => `successfully reloaded \`${command}\``
            }
        },

        TAGS: {
            DESCRIPTION: 'Custom commands created by users',
            INFO: prefix => `Use \`${prefix}help tag to view a list of availble tag methods\``,

            ADD: {
                DESCRIPTION: 'Create a custom command with content (text, markdown, attachments) of your choice, usable server-wide',
                NAME: author => `${author}, what would you like the name of the tag to be?`,
                CONTENT: author => `${author}, what would you like the content of the tag to be?`,
                SUCCESS: (name, prefix) => `successfully created a new tag with the name \`${name}\`, use \`${prefix}${name}\` to try it out`,

                ERR_NAME_LENGTH: 'tag name must be fewer than 32 characters',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS: (author, name) => `${author}, a tag with the name/alias \`${name}\` already exists`,
            },

            ALIAS: {
                DESCRIPTION: 'Add another name to an exisiting tag',
                ADD: author => `${author}, what tag would you like to add an alias to?`,
                NAME: author => `${author}, what would you like the alias to be?`,
                DELETE: author => `${author}, what tag would you like to delete an alias from?`,
                SUCCESS: (name, alias, add) => `${add ? `added alias \`${alias}\` to` : `deleted alias \`${alias}\` from`} \`${name}\``,

                ERR_ALIAS_LENGTH: 'tag alias must be fewer than 32 characters',
                ERR_FLAGS: 'no flag provided, please use `--add/--del`',
                ERR_EXISTS: (author, name) => `${author}, a tag with the name/alias \`${name}\` already exists`,
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },

            DELETE: {
                DESCRIPTION: 'Delete an exisiting tag',
                NAME: author => `${author}, what tag would you like to delete?`,
                SUCCESS: name => `successfully deleted tag \`${name}\``,

                ERR_AUTHOR: 'you can\'t delete a tag authored by another user',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },

            EDIT: {
                DESCRIPTION: 'Edit an existing tag\'s content',
                NAME: author => `${author}, what tag would you like to edit?`,
                CONTENT: author => `${author}, what would you like the new content to be?`,
                SUCCESS: name => `successfully edited tag \`${name}\``,

                ERR_AUTHOR: 'you can\'t edit a tag authored by another user',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },

            INFO: {
                DESCRIPTION: 'View a tag\'s info',
                NAME: author => `${author}, what tag would you like to view?`,
                METHODS: prefix => `Use \`${prefix}help\` tag to view available methods`,

                ERR_EXISTS: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`
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
    },
}

export const clean = input => {
    if (typeof(input) === 'string') {
        return input
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g,  `@${String.fromCharCode(8203)}`);
    } else {
        return input;
    }
}

export const randomID = (length, string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') => {
    let result = '';
    string.split('')

    for (let i = length; i > 0; --i) {
        result += string[Math.floor(Math.random() * string.length)];
    }
    return result;
}

export const flatten = (array, key, depth = 1,) => {
    if (key) return array.flat(depth)[0][key]
    return array.flat(depth)[0]
}