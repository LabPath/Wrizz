import { Listener } from 'discord-akairo';

export default class Warn extends Listener {
    constructor() {
        super('warm', {
            event: 'warn',
            emitter: 'client'
        });
    }

    exec(info: string) {
        console.log(info);
    }
}
