import WrizzClient from './client/WrizzClient'
import { TYPE, EVENT } from './utils/logger'

const client = new WrizzClient()

client
    .on('error', err => client.logger.error(err.message, { type: TYPE.DISCORD, event: EVENT.ERROR }))
    .on('warn', info => client.logger.warn(info, { type: TYPE.DISCORD, event: EVENT.WARN }))

client.start()