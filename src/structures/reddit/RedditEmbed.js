import { MessageEmbed } from 'discord.js'
import { CLRS } from '../../utils/constants'
import moment from 'moment-timezone'

export default class RedditEmbed extends MessageEmbed {
    constructor(post, cmd) {
        super()
    
        const time = moment.tz(post.created_utc * 1000, 'America/New_York')

        if (cmd) this.setTitle(`${time.add(1, 'd').format('MMMM DD, YYYY')}`)
        this.setURL(`https://reddit.com/${post.permalink}`)
        this.setImage(post.url)
        this.setFooter(`Posted by u/${post.author} | ${time.format('h:mm:ss A')}`)
        this.setColor(CLRS.REDDIT)
    }
}