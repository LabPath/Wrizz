import { Listener } from 'discord-akairo';
import { sequelize } from '../../models/index'
import { TYPE, EVT } from '../../utils/logger';
import { CLRS } from '../../utils/constants'

export default class Ready extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        })
    }

    async exec() {
        this.client.logger.info(this.client.user.tag, { type: CLRS.DISCORD(TYPE.DISCORD), event: CLRS.READY(EVT.READY) })

        try {
            await sequelize.authenticate()
            this.client.logger.info('Connected to PostgreSQL', { type: CLRS.PGSQL(TYPE.PGSQL), event: CLRS.CONNECT(EVT.CONNECT) })
        } catch (err) {
            this.client.logger.error(err, { type: CLRS.PGSQL(TYPE.PGSQL), event: CLRS.ERROR(EVT.ERROR) })
        }

        await this.client.redditWatcher.init()
    }
}