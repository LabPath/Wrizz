import { MessageEmbed } from 'discord.js'
import moment from 'moment'
import { COLORS } from '../../utils/constants'

export default class RedditEmbed extends MessageEmbed {
    constructor({
        post,
        date = post.created_utc * 1000,
        format = 'MMMM DD, YYYY',
        title = post.title,
        url = post.url,
        footer = true,
        timestamp = true,
        data = {}
    })

    {
        super(data)

        this.setTitle(`${title}  |  ${moment(date).add(1, 'd').format(format)}`)
        this.setURL(url)
        this.setImage(url)
        this.setTimestamp(timestamp)
        this.setColor(COLORS.REDDIT)

        if (timestamp === true) this.setTimestamp(new Date(date))
        if (footer === true) this.setFooter(`Posted by u/${post.author}`)
    }
}