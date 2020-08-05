import { createLogger, format, transports } from 'winston'
import { COLORS } from '../utils/constants'

export const TYPE = {
    UNHANDLED_REJECTION: 'REJECTION',
    DISCORD: 'DISCORD',
    AKAIRO: 'AKAIRO',
    REDDIT: 'REDDIT'
}

export const EVENT = {
    INIT: 'INIT',
    DEBUG: 'DEBUG',
    ERROR: 'ERROR',
    WARN: 'WARN',
    READY: 'READY',
    DESTROY: 'DESTROY',
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT'
}

export const logger = createLogger({
    format: format.combine(
        format.errors({ stack: true }),
        format.label({ label: 'CLIENT' }),
        format.timestamp({ format: 'YYYY-MM-DDThh:mm:ssa'}),
        format.printf((info) => {
            const { timestamp, label, level, message, type, event } = info
            return `<${COLORS.TIMESTAMP(timestamp)}> [${COLORS.LABEL(label)}](${level.toUpperCase()})+${type}${event ? `@${event}` : ''}: ${message}`
        })
    ),
    transports: [
        new transports.Console({
            format: format.colorize({ level: true }),
            level: 'info'
        })
    ]
})