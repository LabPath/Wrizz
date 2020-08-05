import { get } from 'superagent'
import download from 'image-downloader'

async function reddit() {

    const { body } = await get('https://www.reddit.com/r/Lab_path/new.json?sort=new').query({ limit: 1 });
    const options = {
        url: body.data.children[0].data.url,
        dest: './LabPath Maps'
    }

    download.image(options).then(({ filename }) => {
        console.log(`Saved to ${filename}`)
    }).catch(err => console.log(err))
}

reddit()