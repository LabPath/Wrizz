import { MessageEmbed } from 'discord.js'
import { stripIndents } from 'common-tags'
import { read } from 'jimp'
import _ from 'chalk'
import ms from 'ms'

export const c = {
    err: $ => _.red($),
    cmd: $ => _.green($),
    init: $ => _.blue($),
    ready: $ => _.green($),
    akairo: $ => _.hex('A5051E')($),
    discord: $ => _.hex('7289DA')($),
    connect: $ => _.green($),

    default: '249EA0',

    0: '6C369D',
    10: '6C369D',
    20: 'F1C232',
    30: 'CC0300',
    mauler: 'FFC300',
    wilder: '4EF771',
    hypogean: '7E00A0',
    gaveborn: '006C04',
    celestial: 'FEFEFE',
    lightbearer: '009FCC',
    dimensional: '9498FF'
}

export const MESSAGES = {
    HANDLER: {
        PROMPT: {
            START: (str) => `${str}\n*Type \`cancel\` to cancel the command*`,
            RETRY: (str) => `${str}\n*Type \`cancel\` to cancel the command*`,
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
                HERO: (author) => `${author}, which hero's furniture would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`
            },

            GUIDES: {
                DESCRIPTION: ''
            },

            HERO: {
                DESCRIPTION: 'View a hero\'s general info',
                NAME: (author) => `${author}, which hero would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`
            },

            MAP: {
                DESCRIPTION: stripIndents`
                    View the latest Arcane Labyrinth map or query a map with a date string
                    
                    ❯ Accepted Date Strings
                    • YYYY-[M]M-[D]D (Can omit leading 0)
                    • [M]M-[D]D-[YY]YY (Can omit leading 0 & first two year digits)`,

                ERR_FETCH: 'there was an error while fetching the latest map',
                ERR_NO_MAP: (date) => `unable to find a map with a date of \`${date}\``,
                ERR_DATE: (date) => `\`${date}\` is an invalid date string`
            },

            PROFILE: {
                ERR_EXISTS: (prefix) => `you haven\'t set up your profile yet, use \`${prefix}setprofile\``
            },

            SIGNATURE: {
                DESCRIPTION: 'View a hero\'s signature item upgrades',
                HERO: (author) => `${author}, which hero's signature item would you like to view?`,
                LEVEL: (author) => `${author}, which level unlock would you like to view?`,

                ERR_EXISTS: (author, hero) => `${author}, a hero with the name \`${hero}\` doesn't exist`,
                ERR_EXISTS2: (author, level) => `${author}, \`${level}\` is an invalid level unlock`
            },

            TODAY: {
                DESCRIPTION: 'Get the current info of what\'s happening in AFK Arena'
            }
        },

        GENERAL: {
            HELP: {
                DESCRIPTION: 'View specific info on a command or a full list'
            },

            REMIND: {
                DESCRIPTION: 'Set a custom reminder',
                DURATION: (author) => `${author}, how long would you like this reminder to last?`,
                CONTENT: (author) => `${author}, what would you like the content for the reminder to be?`,
                SUCCESS: (time) => `successfully set a reminder for \`${ms(ms(time), { long: true })}\``,
                FINISH: (user, content) => `${user}, reminder to\n> ${content}`,

                ERR_DURATION: (author, time) => `${author}, \`${time}\` is an invalid duration`,
                ERR_REF_LENGTH: 'reminder reference must be fewer than 32 characters',
                ERR_CONTENT_LENGTH: 'reminder content must be fewer than 1850 characters',
            },

            ROLE: {
                DESCRIPTION: 'Assign yourself a role',
                ADD: (author) => `${author}, what role would you like to join?`,
                LEAVE: (author) => `${author}, what role would you like to leave?`,
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
                CONTENT: (author) => `${author}, what would you like to suggest?`,
                DISABLED: (guild) => `suggestions are disabled in \`${guild}\``,

                ERR_CONTENT_LENGTH: 'suggestion content must be fewer than 1850 characters',
                ERR_CHANNEL: (channel) => `you can only make suggestions in <#${channel}>`
            },

            USER: {
                DESCRIPTION: 'View a user\`s info',
            }
        },

        MOD: {
            CLOSE: {
                SUCCESS: (id, author) => `Suggestion \`${id}\` closed by \`${author.tag}\``,

                ERR_EXISTS: (id) => `a suggestion with ID \`${id}\` doesn't exist`
            },

            PREFIX: {
                DESCRIPTION: 'Set the bot prefix',
                ERR_LENGTH: 'Prefix must be fewer than 3 characters',
                CURRENT: (guild, prefix) => `The current prefix for ${guild} is \`${prefix}\``,
                RESET: (prefix) => `Successfully reset the bot prefix to \`${prefix}\``,
                SUCCESS: (prefix) => `Successfully set the bot prefix to \`${prefix}\``
            },

            STAFFROLE: {
                DESCRIPTION: 'Set the staff role',
                SUCCESS: (role) => `successfully set the staff role to \`${role}\``,

                ERR_EXISTS: (role) => `a role with the name \`${role}\` doesn't exist`,
            },

            SETCHANNEL: {
                DESCRIPTION: 'Set the suggestions channel',
                CONTENT: (author) => `${author}, what channel would you like to limit suggestions to?`,
                EMBED: (author) => new MessageEmbed()
                .setDescription(stripIndents`
                    Type one of the following numbers
                    to set a channel
                    \`\`\`ocaml
                    [1] Moderation Logs
                    [2] Member Logs
                    [3] Suggestions\`\`\``)
                .setFooter(author.tag, author.displayAvatarURL())
                .setColor(c.default),
                CHANNEL: (type, author) => `${author}, what would you like the ${type} channel to be?`,
                SUCCESS: (num, channel) => `successfully set the ${num === 1 ? 'Moderation Logs' : num === 2 ? 'Member Logs' : 'Suggestions'} channel to \`#${channel}\``,

                ERR_EXISTS: (author, channel) => `${author}, a channel with the name/ID \`${channel}\` doesn't exist`,
                ERR_OPTION: (author, option) => `${author}, ${option} is an invalid option`
            }
        },

        TAGS: {
            DESCRIPTION: 'Custom commands created by users',
            INFO: prefix => `Use \`${prefix}help tag to view a list of availble tag methods\``,

            ADD: {
                DESCRIPTION: 'Create a custom command with content (text, markdown, attachments) of your choice, usable server-wide',
                NAME: (author) => `${author}, what would you like the name of the tag to be?`,
                CONTENT: (author) => `${author}, what would you like the content of the tag to be?`,
                SUCCESS: (name, prefix) => `successfully created a new tag with the name \`${name}\`, use \`${prefix}${name}\` to try it out`,

                ERR_NAME_LENGTH: 'tag name must be fewer than 32 characters',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS: (name) => `a tag with the name/alias \`${name}\` already exists`,
            },

            DELETE: {
                DESCRIPTION: 'Delete an exisiting tag',
                NAME: (author) => `${author}, what tag would you like to delete?`,
                SUCCESS: (name) => `successfully deleted tag \`${name}\``,

                ERR_AUTHOR: 'you can\'t delete a tag authored by another user',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },

            EDIT: {
                DESCRIPTION: 'Edit an existing tag\'s content',
                NAME: (author) => `${author}, what tag would you like to edit?`,
                CONTENT: (author) => `${author}, what would you like the new content to be?`,
                SUCCESS: (name) => `successfully edited tag \`${name}\``,

                ERR_AUTHOR: 'you can\'t edit a tag authored by another user',
                ERR_CONTENT_LENGTH: 'tag content must be fewer than 1850 characters',
                ERR_EXISTS2: (author, name) => `${author}, a tag with the name/alias \`${name}\` doesn't exist`,
            },

            SEARCH: {
                DESCRIPTION: 'Find a tag with a wildcard search that matches tag names and aliases',
                QUERY: (author) => `${author}, what tag would you like to ssearch for?`,

                ERR_NAME_LENGTH: 'tag name must be fewer than 32 characters',
                ERR_RESULTS: (name) => `no search results for \`${name}\``
            },
            
            SHOW: {
                DESCRIPTION: 'View a tag\'s content',
                NAME: (author) => `${author}, what tag would you like to view?`,
            }
        }
    },
}

export const capital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const circle = async (image) => {
    let img = await read(image)
    img.resize(285, 285)
    img.circle()

    return await img.getBufferAsync('image/png')
}

export const clean = (input) => {
    if (typeof(input) === 'string') {
        return input
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g,  `@${String.fromCharCode(8203)}`);
    } else {
        return input;
    }
}

export const comma = (number, places = 1, units = ['', 'K', 'M', 'B']) => {
    const sign = Math.sign(number) >= 0;
    number = Math.abs(number);
  
    const tier = (Math.log10(number) / 3) | 0;
    if (tier === 0) return number.toString();
  
    const suffix = units[tier];
    if (!suffix) return number
  
    const scaled = number / Math.pow(10, tier * 3);
  
    return (!sign ? '-' : '') + scaled.toFixed(places) + suffix;
}

export const randomID = (length, string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') => {
    let result = '';
    string.split('')

    for (let i = length; i > 0; --i) {
        result += string[Math.floor(Math.random() * string.length)];
    }
    
    return result;
}