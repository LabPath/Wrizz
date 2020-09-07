import RedditClient from './RedditClient'
import RedditEmbed from './RedditEmbed'
import { TYPE, EVENT } from '../../utils/logger';
import { COLORS } from '../../utils/constants'
import cs from 'clean-stack'

export default class RedditWatcher {
    constructor(client) {
        this.client = client
        this.reddit = new RedditClient()
    }

    async init() {
        const guild = this.client.guilds.cache.get(process.env.GUILD_ID)
        const channel = guild.channels.cache.get(process.env.CHANNEL_ID)
        const role = guild.roles.cache.get('725477327215132693')

        this.reddit.on('ready', () => {
                this.client.logger.info('Connected to Reddit', { 
                    type: COLORS._REDDIT(TYPE.REDDIT), 
                    event: COLORS.CONNECT(EVENT.CONNECT)
                })
            })
        .on('post', data => {
            channel.send(role ? role : '', new RedditEmbed(data[0]))
        })
        .on('error', err => console.log(cs(err.stack)))

        await this.reddit.start()
    }
}