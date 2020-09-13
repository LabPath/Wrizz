import RedditClient from './RedditClient'
import RedditEmbed from './RedditEmbed'
import { TYPE, EVT } from '../../utils/logger';
import { CLRS } from '../../utils/constants'
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
                    type: CLRS._REDDIT(TYPE.REDDIT), 
                    event: CLRS.CONNECT(EVT.CONNECT)
                })
            })
        .on('post', data => {
            channel.send(role ? role : '', new RedditEmbed(data[0], false))
        })
        .on('error', err => console.log(cs(err.stack)))

        await this.reddit.start()
    }
}