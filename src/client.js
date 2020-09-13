import WrizzClient from './client/WrizzClient'
import { TYPE, EVT } from './utils/logger'

const client = new WrizzClient()

client
    .on('error', err => client.logger.error(err.message, { type: TYPE.DISCORD, event: EVT.ERROR }))
    .on('warn', info => client.logger.warn(info, { type: TYPE.DISCORD, event: EVT.WARN }))

client.start()