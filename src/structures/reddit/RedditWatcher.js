import RedditClient from './RedditClient'
import RedditEmbed from './RedditEmbed'
import { COLORS } from '../../utils/constants'
import { TYPE, EVENT } from '../../utils/logger';

export default class RedditWatcher {
    constructor(client) {
        this.client = client
        this.reddit = new RedditClient()
    }

    async init() {
        const guild = this.client.guilds.cache.get(process.env.GUILD_ID)
        const channel = guild.channels.cache.get(process.env.CHANNEL_ID)

        await this.reddit.add('Lab_path')
        this.reddit
            .on('ready', () => this.client.logger.info('Connected to Reddit', { type: COLORS._REDDIT(TYPE.REDDIT), event: COLORS.CONNECT(EVENT.CONNECT)}))
            .on('post', data => channel.send('<@740004956513501224>', new RedditEmbed({ post: data[0], title: 'Arcane Labyrinth' })))
            .on('error', err => console.log(cleanStack(err.stack)))

        await this.reddit.start()
    }
}