import { stripIndents } from 'common-tags';

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
