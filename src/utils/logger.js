import { createLogger, format, transports, addColors } from 'winston'
import { COLORS } from '../utils/constants'

export const TYPE = {
    AKAIRO: 'AKAIRO',
    REDDIT: 'REDDIT',
    DISCORD: 'DISCORD',
    REJECTION: 'REJECTION'
}

export const EVENT = {
    INIT: 'INIT',
    WARN: 'WARN',
    ERROR: 'ERROR',
    READY: 'READY',
    DEBUG: 'DEBUG',
    DESTROY: 'DESTROY',
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT'
}

export const logger = createLogger({
    format: format.combine(
        format.colorize({ level: true, colors: { info: 'black whiteBG' } }),
        format.timestamp({ format: 'MM-DDThh:mm:ssa'}),
        format.errors({ stack: true }),
        format.printf(info => {
            const { timestamp, level, message, type, event } = info
            return `${timestamp} ${level} ${type}${event ? `#${event}` : ''}: ${message}`
        })
    ),

    transports: [new transports.Console({ level: 'info' })]
})