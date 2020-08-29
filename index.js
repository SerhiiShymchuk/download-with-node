const https = require('https')
const fs = require('fs')

const links = JSON.parse(fs.readFileSync('links.json').toString())

getFile(0)

function getFile(i) {
    if (i >= links.length) return
    const save = fs.createWriteStream(`downloads/video${i}.mp4`)
    save.on('close', () => {
        console.log(i + 1 + ' file downloaded')
        getFile(i+1)
    })
    https.get(links[i], {}, file=> file.pipe(save) )
}
