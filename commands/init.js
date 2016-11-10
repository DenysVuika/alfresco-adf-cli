const path = require('path');
const fs = require('fs');
const logger = require('../util/logger');

const COMMAND_NAME = 'init';

const FILES = [
    '.editorconfig',
    '.eslintrc.json',
    '.gitignore',
    '.npmignore',
    '.travis.yml',
    'tsconfig.json',
    'tslint.json'
];

function copyFile (fileName, targetDir) {
    return new Promise((resolve, reject) => {
        const inputPath = path.join(__dirname, `.init/${fileName}`);
        const outputPath = path.join(targetDir, fileName);

        fs.readFile(inputPath, (err, data) => {
            if (err) {
                logger.error(COMMAND_NAME, err);
                reject(err);
                return;
            }
            fs.writeFile(outputPath, data, (err) => {
                if (err) {
                    logger.error(COMMAND_NAME, err);
                    reject(err);
                    return;
                }
                logger.info(COMMAND_NAME, `-> ${fileName}`);
                resolve(fileName);
            });
        });
    });
}

module.exports = {
    command: 'init [dir]',
    desc: 'Init ADF project',
    builder: {
        dir: {
            default: '.'
        }
    },
    handler: function (argv) {
        const projectDir = path.resolve(argv.dir);
        logger.info(COMMAND_NAME, `configuring ${projectDir}`);

        Promise.all(FILES.map(f => copyFile(f, projectDir)))
            .then(results => logger.info(COMMAND_NAME, 'setup complete'))
            .catch(err => console.log(err));
    }
};
