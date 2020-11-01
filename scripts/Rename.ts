import { readdirSync, renameSync } from 'fs';
import { resolve } from 'path';
import moment from 'moment';

const dir = resolve('../../../../');
const files = readdirSync(dir);

const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const randomID = (length: number): string => {
    let result = '';
    string.split('');

    for (let i = length; i > 0; --i) {
        result += string[Math.floor(Math.random() * string.length)];
    }
    return result;
}

// NAME FORMAT: Lab_Path<YYYY-MM-DD>#10DigitNum

for (let i = 0; i < files.length; i++) {
    renameSync(
        `${dir}/${files[i]}`, 
        `${dir}/Lab_Path<${moment().add(i + i, 'd')
        .format('YYYY-MM-DD')}>#${randomID(10)}.png`
    )
}
