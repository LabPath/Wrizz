import { readdirSync, renameSync } from 'fs'
import { resolve } from 'path'
import { randomID } from './src/utils/constants'
import moment from 'moment'

const dir = resolve( /* FOLDER PATH */ )
const files = readdirSync(dir)

const id = randomID(10)
const date = 'YYYY-MM-DD'

// NAME FORMAT: Lab_Path<YYYY-MM-DD>#10DigitNum

i = 0

files.forEach(file => {
    renameSync(`${dir}/${file}`, `${dir}/Lab_Path<${moment( /* START DATE */ ).add(i + i, 'd').format(date)}>#${id}.png`)
    i++
})