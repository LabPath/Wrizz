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
        description: 'Display the emblems requirements for signature item upgrades'
    },

    furniture: {
        description: 'View the furniture ability and respective upgrades for the given hero',
        err_hero: (hero: string) => `A hero with the name \`${hero}\` doesn't exist`
    },

    guides: {
        description: 'Receive a set of links for guides made by the community'
    },

    hero: {
        description: 'View general information about the given hero',
        err_hero: (hero: string) => `A hero with the name \`${hero}\` doesn't exist`
    },

    map: {
        description: stripIndents`
            Display the latest Arcane Labyrinth map from r/LabPath or query a map from a specific date
                    
            ❯ Accepted Date Strings
            • YYYY-[M]M-[D]D (Can omit leading 0)
            • [M]M-[D]D-[YY]YY (Can omit leading 0 & first two year digits)`,

        err_fetch: 'There was an error while fetching the latest map',
        err_map: (date: string) => `Unable to find a map with a date of \`${date}\``,
        err_date: (date: string) => `\`${date}\` is an invalid date string`
    },

    signature: {
        description: 'View a hero\'s signature item or a specific level unlock',
        err_hero: (hero: string) => `A hero with the name \`${hero}\` doesn't exist`
    },

    help: {
        description: 'View information for the given command'
    },

    prefix: {
        description: 'Change the server\'s prefix. e default prefix is `!`, along with a mention prefix built in (`@Wrizz`)',
        current: (prefix: any) => `The current prefix is \`${prefix}\``,
        success: (prefix: string) => `Set the server prefix to \`${prefix}\``
    }
};

export const capital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
