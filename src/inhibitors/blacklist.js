import { Inhibitor } from 'discord-akairo'

export default class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }

    exec(message) {
        const blacklist = [];
        return blacklist.includes(message.author.id);
    }
}