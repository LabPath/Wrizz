import { stripIndents } from 'common-tags';

export const dateRegex = /\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])/

export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const Unlocks = {
    '0': 'default',
    '10': 'unlock1',
    '20': 'unlock2',
    '30': 'unlock3'
};

export enum Levels {
    default = 0x6C369D,
    unlock1 = 0x6C369D,
    unlock2 = 0xF1C232,
    unlock3 = 0xCC0300
};

export enum Factions {
    Celestial = 0xFEFEFE,
    Hypogean = 0x7E00A0,
    Lightbearer = 0x009FCC,
    Mauler = 0xFFC300,
    Wilder = 0x4EF771,
    Graveborn = 0x006C04,
    Dimensional = 0x9498FF
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
        description: `Display the latest Arcane Labyrinth map from [r/LabPath](${process.env.REDDIT_URL})`,
        options: stripIndents`
            Search a map by date in \`YYYY-MM-DD\` format

            YYYY: A four-digit year; currently either 2019 or 2020
            MM: A two-digit month; zero padded (e.g. 04 = April)
            DD: A two-digit date; zero padded (e.g. 27)
            
            2020-01-01 --> January 1st, 2020
        `,
        err_fetch: 'There was an error while fetching the latest map',
        err_map: (id: string) => `There was an error while fetching submission \`${id}\`. You could try the url itself: https://redd.it/${id}`,
    },

    signature: {
        description: 'View a hero\'s signature item',
        options: 'View a specific level unlock; one of `0`, `10`, `20`, or `30`',
        err_hero: (hero: string) => `A hero with the name \`${hero}\` doesn't exist`
    },

    help: {
        description: 'View information for the given command'
    },

    prefix: {
        description: 'Change the server\'s prefix. The default prefix is `!`, along with a mention prefix built in (`@Wrizz`)',
        current: (prefix: any) => `The current prefix is \`${prefix}\``,
        success: (prefix: string) => `Set the server prefix to \`${prefix}\``
    }
};

export const capital = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
