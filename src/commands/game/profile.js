// import { Command } from 'discord-akairo'
// import { MessageAttachment } from 'discord.js'
// import { circle, flatten } from '../../utils/constants'
// import { createCanvas, loadImage, registerFont } from 'canvas'
// import { PGSQL } from '../../utils/postgresql'

// const canvas = createCanvas(1080, 360);
// const ctx = canvas.getContext('2d');
// const statuses = {
//     dnd: '#ED494C',
//     idle: '#F8A531',
//     online: '#49B482',
//     offline: '#747F8D'
// }

// export default class Profile extends Command {
//     constructor() {
//         super('profile', {
//             aliases: ['profile'],
//             description: {
//                 content: '',
//             },
//             category: 'game',
//             args: [
//                 {
//                     id: 'member',
//                     type: 'member',
//                     default: message => message.member
//                 }
//             ]
//         })
//     }

//     async exec(message, { member }) {
//         const { user } = member
//         let profile = await PGSQL.PROFILE.FETCH(user.id)
//         profile = flatten(profile)

//         const font = 'Circular Black';
//         const defColor = '#00FF5E'
//         const margin = 25

//         const background = await loadImage(`${__dirname}/../../assets/images/layout.png`)
//         ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

//         const avatarX = margin
//         const avatarY = 35
//         const avatarW = 285
//         const avatarH = 285

//         ctx.beginPath()
//         ctx.arc(159.5, 225, 150, 0, Math.PI * 2, true)
//         ctx.closePath()
//         ctx.clip()

//         const avatar = await loadImage(user.avatarURL({ format: 'png' }))
//         ctx.drawImage(avatar, -55, -20, 450, 450)

//         ctx.beginPath()
//         ctx.arc(0, 0, 150, 0, Math.PI * 2, true)
//         ctx.clip()
//         ctx.closePath()
//         // const cirAvatar = await circle()
//         // const avatar = await loadImage(cirAvatar);
//         // ctx.drawImage(avatar, 45, avatarY, avatarW, avatarH);
        
//         // // - STATUS RING - //

//         // ctx.lineWidth = 6
//         // ctx.beginPath()
//         // ctx.arc(45, 35, 285, 0, Math.PI * 2, true)
//         // ctx.strokeStyle = statuses[user.presence.status]
//         // ctx.stroke()
//         // ctx.closePath()

//         // - NAME + DISCRIM - //

//         const name = user.username.length > 15 ? `${user.username.substring(0, 15).trim()} . . .` : user.username;

//         ctx.font = `36px ${font}`;
//         ctx.fillStyle = '#FFF';
//         ctx.textAlign = 'start';
//         ctx.fillText(`${name}`, 220, 100);

//         ctx.fillStyle = defColor
//         ctx.textAlign = 'center';
//         ctx.fillText(`#${user.discriminator}`, 640, 100);

//         // - PLAYER INFO - //

//         ctx.font = `28px ${font}`
//         ctx.fillStyle = '#FFF'
//         ctx.textAlign = 'start'

//         ctx.fillStyle = defColor
//         ctx.fillText(`${profile.player}`, )
//         ctx.fillText(`${profile.player_id}`, )
//         ctx.fillText(`${profile.guild}`, )
//         ctx.fillText(`${profile.guild_id}`, )
//         ctx.fillText(`${profile.hero}`, )
        
//         const attachment = new MessageAttachment(canvas.toBuffer(), 'profile.png')
//         message.util.send(attachment)
//     }
// }