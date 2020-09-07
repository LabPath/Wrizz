import { MessageEmbed } from 'discord.js'
import moment from 'moment-timezone'
import { COLORS } from '../../utils/constants'

export default class RedditEmbed extends MessageEmbed {
    constructor(post) {
        super()
        
        this.post = post

        this.setTitle(`${moment.tz('America/New_York').add(1, 'd').format('MMMM DD, YYYY')}`)
        this.setURL(`https://reddit.com/${this.post.permalink}`)
        this.setImage(this.post.url)
        this.setFooter(`Posted by u/${this.post.author} | ${moment.tz(this.post.created_utc * 1000, 'America/New_York').format('h:mm:ss A')}`)
        this.setColor(COLORS.REDDIT)
    }
}