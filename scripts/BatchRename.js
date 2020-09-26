const { readdirSync, renameSync } = require('fs');
const { resolve } = require('path');
const moment = require('moment');

const dir = resolve('../../../../');
let files = readdirSync(dir);

const final = false;

// NAME FORMAT: Lab_Path<YYYY-MM-DD>#10DigitNum

i = 0;

if (final) {
    files.forEach((file) => {
        renameSync(
            `${dir}/${file}`,
            `${dir}/Lab_Path<${moment('')
                .add(i + i, 'd')
                .format('YYYY-MM-DD')}>#${randomID(10)}.png`
        );
        i++;
    });
} else {
    for (i = 0; i > 20; i++) {
        console.log(randomID(10));
    }
}

function randomID(length, string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
    let result = '';
    string.split('');

    for (let i = length; i > 0; --i) {
        result += string[Math.floor(Math.random() * string.length)];
    }
    return result;
}
