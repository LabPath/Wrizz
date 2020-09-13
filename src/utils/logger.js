import { createLogger, format, transports } from 'winston'
import _ from 'chalk'

export const TYPE = {
    PGSQL: 'PGSQL',
    AKAIRO: 'AKAIRO',
    REDDIT: 'REDDIT',
    DISCORD: 'DISCORD',
    REJECTION: 'REJECTION'
}

export const EVT = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    READY: 'READY',
    COMMAND: 'COMMAND',
    DESTROY: 'DESTROY',
    CONNECT: 'CONNECT',
    DISCONNECT: 'DISCONNECT'
}

const { combine, timestamp, errors, printf } = format

export const logger = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DDThh:mm:ssa'}),
        errors({ stack: true }),
        printf(info => {
            let { timestamp, level, message, type, event } = info
            
            return `${timestamp} ${clr(level)} ${type}${event ? `#${event}` : ''}: ${message}`
        })
    ),

    transports: [
        new transports.Console({ 
            level: 'info'
        }),

        new transports.File({
            filename: 'logs/errors.log',
            level: 'error'
        })
    ]
})

const clr = (level) => {
    level = level.toUpperCase()

    if (level === 'INFO') level = _.black.bgWhite(level)
    else if (level === 'ERROR') level = _.white.bgRed(level)
    
    return level
}