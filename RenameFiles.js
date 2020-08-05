const { readdirSync, renameSync } = require('fs')
const { resolve } = require('path')

const moment = require('moment')
const randomID = require('crypto-random-string')

const dir = resolve( /* FOLDER PATH */)
const files = readdirSync(dir)

const id = randomID({ length: 10 })
const date = 'YYYY-MM-DD'

// NAME FORMAT: Lab_Path<YYYY-MM-DD>#10DigitNum

i = 0

files.forEach(file => {
    renameSync(`${dir}/${file}`, `${dir}/Lab_Path<${moment( /* START DATE */ ).add(i + i, 'd').format(date)}>#${id}.png`)
    i++
})