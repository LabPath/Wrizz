import { Listener } from 'discord-akairo';

export default class Ready extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    public exec() {
        console.log(this.client.user.tag);
    }
}
