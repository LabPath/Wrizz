import { stripIndents } from 'common-tags';
import { User } from 'discord.js';

export const levels = {
    0: '6C369D',
    10: '6C369D',
    20: 'F1C232',
    30: 'CC0300'
};

export const factions = {
    Mauler: 'FFC300',
    Wilder: '4EF771',
    Hypogean: '7E00A0',
    Graveborn: '006C04',
    Celestial: 'FEFEFE',
    Lightbearer: '009FCC',
    Dimensional: '9498FF'
};

export const cmd = {
    emblems: {
        description: 'View the emblem requirements for SI level ups'
    },

    furniture: {
        description: "View a hero's furniture ability upgrades",
        hero: (author: User) => `${author}, which hero's furniture would you like to view?`,
        err_hero: (hero: string) => `a hero with the name \`${hero}\` doesn't exist`
    },

    guides: {
        description: ''
    },

    hero: {
        description: "View a hero's general info",
        name: (author: User) => `${author}, which hero would you like to view?`,
        err_hero: (hero: string) => `a hero with the name \`${hero}\` doesn't exist`
    },

    map: {
        description: stripIndents`
            View the latest Arcane Labyrinth map or query a map with a date string
                    
            ❯ Accepted Date Strings
            • YYYY-[M]M-[D]D (Can omit leading 0)
            • [M]M-[D]D-[YY]YY (Can omit leading 0 & first two year digits)`,

        err_fetch: 'there was an error while fetching the latest map',
        err_map: (date: string) => `unable to find a map with a date of \`${date}\``,
        err_date: (date: string) => `\`${date}\` is an invalid date string`
    },

    signature: {
        description: "View a hero's signature item upgrades",
        hero: (author: User) => `${author}, which hero's signature item would you like to view?`,
        level: (author: User) => `${author}, which level unlock would you like to view?`,
        err_hero: (hero: string) => `a hero with the name \`${hero}\` doesn't exist`
    },

    help: {
        description: 'View specific info on a command or a full list'
    },

    prefix: {
        description: 'Set the server prefix',
        current: (prefix: any) => `The current prefix is \`${prefix}\``,
        success: (prefix: string) => `Set the server prefix to \`${prefix}\``
    }
};

export const capital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
