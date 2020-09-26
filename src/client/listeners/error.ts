import { Listener } from 'discord-akairo';

export default class Error extends Listener {
    constructor() {
        super('error', {
            event: 'error',
            emitter: 'commands'
        });
    }

    exec(error: string) {
        console.log(error);
    }
}
