import { MessageEmbed } from 'discord.js'
import moment from 'moment'
import { COLORS } from '../../utils/constants'

export default class RedditEmbed extends MessageEmbed {
    constructor(post) {
        super()
        
        this.post = post
        this.url = this.post.url

        this.setTitle(`${moment().add(1, 'd').format('MMMM DD, YYYY')}`)
        this.setURL(this.url)
        this.setImage(this.url)
        this.setFooter(`Posted by u/${this.post.author} | ${moment().format('h:mm:ss A')}`)
        this.setColor(COLORS.REDDIT)
    }
}