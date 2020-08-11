import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler, Flag } from 'discord-akairo'
import RedditWatcher from '../structures/reddit/RedditWatcher'
import SettingsProvider from '../structures/SettingsProvider'
import ReminderHandler from '../structures/ReminderHandler'
import { COLORS, MESSAGES, FUNCTIONS } from '../utils/constants'
import { TYPE, EVENT, logger } from '../utils/logger'
import { PGSQL } from '../utils/postgresql'
import { Util } from 'discord.js'
import { join } from 'path'

export default class WrizzClient extends AkairoClient {
    constructor() {
        super({ ownerID: process.env.OWNER_ID }, { disableMentions: 'everyone' })

        this.logger = logger
        this.settings = new SettingsProvider()
        this.remind = new ReminderHandler(this)

        this.commandHandler = new CommandHandler(this, {
            directory: join(__dirname, '../commands'),
            prefix: message => this.settings.get(message.guild, 'prefix', process.env.PREFIX),
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 60000,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_START(str),
                    modifyRetry: (_, str) => MESSAGES.COMMAND_HANDLER.PROMPT.MODIFY_RETRY(str),
                    timeout: MESSAGES.COMMAND_HANDLER.PROMPT.TIMEOUT,
                    cancel: MESSAGES.COMMAND_HANDLER.PROMPT.CANCEL
                },
                otherwise: ''
            },
            aliasReplacement: /-/g
        })

        this.inhibitorHandler = new InhibitorHandler(this, { directory: join(__dirname, '../inhibitors') })
        this.listenerHandler = new ListenerHandler(this, { directory: join(__dirname, '../listeners') })
        this.redditWatcher = new RedditWatcher(this)

        this.commandHandler.resolver.addType('tag', async (message, phrase) => {
            if (!message.guild || !phrase) return Flag.fail(phrase);
            phrase = Util.cleanContent(phrase.toLowerCase(), message);

            const result = await PGSQL.TAGS.TYPE(phrase, message)
            
            let tag;

            if (typeof result[0][0] === 'undefined') tag = null
            else tag = FUNCTIONS.FLATTEN(result)

			return tag || Flag.fail(phrase);
        });

        this.commandHandler.resolver.addType('existingTag', async (message, phrase) => {
            if (!message.guild || !phrase) return Flag.fail(phrase);
            phrase.split(',').forEach(str => Util.cleanContent(str.trim().toLowerCase(), message));

			const result = await PGSQL.TAGS.TYPE(phrase, message)
            
            let tag;

            if (typeof result[0][0] === 'undefined') tag = null
            else tag = FUNCTIONS.FLATTEN(result)

			return tag ? Flag.fail(tag.name) : phrase;
        });

        this.commandHandler.resolver.addType('hero', async (message, phrase) => {
            if (!message.guild || !phrase) return Flag.fail(phrase);
            phrase = Util.cleanContent(phrase.toLowerCase(), message);

            const result = await PGSQL.HERO.TYPE(phrase)

            let hero;
            
            if (typeof result[0][0] === 'undefined') hero = null
            else hero = FUNCTIONS.FLATTEN(result, 'name')

			return hero || Flag.fail(phrase);
        });
    }

    async _init() {
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler)
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            inhibitorHandler: this.inhibitorHandler,
            listenerHandler: this.listenerHandler
        })

        this.commandHandler.loadAll()
        this.logger.info('Commands loaded', { type: COLORS.AKAIRO(TYPE.AKAIRO), event: COLORS.INIT(EVENT.INIT) })
        this.inhibitorHandler.loadAll()
        this.logger.info('Inhibitors loaded', { type: COLORS.AKAIRO(TYPE.AKAIRO), event: COLORS.INIT(EVENT.INIT) })
        this.listenerHandler.loadAll()
        this.logger.info('Listeners loaded', { type: COLORS.AKAIRO(TYPE.AKAIRO), event: COLORS.INIT(EVENT.INIT) })
        await this.settings.init()
        this.logger.info('Settings loaded', { type: COLORS.AKAIRO(TYPE.AKAIRO), event: COLORS.INIT(EVENT.INIT) })
        await this.remind.init()
        this.logger.info('Reminders loaded', { type: COLORS.AKAIRO(TYPE.AKAIRO), event: COLORS.INIT(EVENT.INIT) })
    }

    async start() {
        await this._init()
        return this.login(process.env.TOKEN)
    }
}