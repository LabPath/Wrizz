import { createLogger, format, transports } from 'winston'

export const TYPE = {
    AUTH: 'AUTH',
    AKAIRO: 'AKAIRO',
    DISCORD: 'DISCORD',
}

export const EVT = {
    INIT: 'INIT',
    ERROR: 'ERROR',
    READY: 'READY',
    RELOAD: 'RELOAD',
    COMMAND: 'COMMAND',
    DESTROY: 'DESTROY',
    CONNECT: 'CONNECT',
}

const { combine, timestamp, errors, printf } = format

export const log = createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MM-DD hh:mm:ssa'}),
        errors({ stack: true }),
        printf(i => {
            return `${i.timestamp} [${i.level}] ${i.type}#${i.event}: ${i.message}`
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