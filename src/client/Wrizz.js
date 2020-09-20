import { 
    AkairoClient, 
    CommandHandler as C, 
    ListenerHandler as L,
    InhibitorHandler as I, 
} from 'discord-akairo'

import RedditClient from '../structures/RedditClient'
import SettingsProvider from '../structures/SettingsProvider'
import ReminderHandler from '../structures/ReminderHandler'
import Query from '../utils/postgresql'
import _ from 'chalk'
import { c, MESSAGES } from '../utils/constants'
import { TYPE, EVT, log } from '../utils/log'

export default class Wrizz extends AkairoClient {
    constructor() {
        super(
            { ownerID: process.env.OWNER_ID },
            { disableMentions: 'everyone' }
        )

        this.log = log
        this.query = new Query()
        this.reddit = new RedditClient(this)
        this.settings = new SettingsProvider(this)
        this.reminders = new ReminderHandler(this)
        
        this.commands = new C(this, {
            directory: `${__dirname}/../commands`,
            prefix: (message) => this.settings.get(message.guild, 'prefix', process.env.PREFIX),
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 1.2e5,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => MESSAGES.HANDLER.PROMPT.START(str),
                    modifyRetry: (_, str) => MESSAGES.HANDLER.PROMPT.RETRY(str),
                    timeout: MESSAGES.HANDLER.PROMPT.TIMEOUT,
                    cancel: MESSAGES.HANDLER.PROMPT.CANCEL
                },
                otherwise: ''
            },
            aliasReplacement: /-/g
        })

        this.inhibitors = new I(this, { directory: `${__dirname}/../inhibitors` })
        this.listeners = new L(this, { directory: `${__dirname}/../listeners` })
    }

    async init() {
        this.commands.useInhibitorHandler(this.inhibitors)
        this.commands.useListenerHandler(this.listeners)
        this.listeners.setEmitters({
            commands: this.commands,
            inhibitors: this.inhibitors,
            listeners: this.listeners
        })

        this.commands.loadAll()
        this.listeners.loadAll()
        this.inhibitors.loadAll()
        this.log.info('Modules loaded ✔️', { type: c.akairo(TYPE.AKAIRO), event: c.init(EVT.INIT) })

        await this.settings.init()
        await this.reminders.init()
        this.log.info('Structures loaded ✔️', { type: c.akairo(TYPE.AKAIRO), event: c.init(EVT.INIT) })

        await this.reddit.init()
        await this.query.authenticate()
        this.log.info('Connections established ✔️', { type: _.gray(TYPE.AUTH), event: c.connect(EVT.CONNECT) })
    }

    async start() {
        await this.init()
        return this.login(process.env.TOKEN)
    }
}