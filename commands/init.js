const path = require('path');
const fs = require('fs');
const Logger = require('../util/logger');

class InitCommand {

    constructor() {
        this.logger = new Logger('init');
        this.command = 'init [dir]';
        this.desc = 'Init ADF project';
        this.builder = {
            dir: {
                describe: 'Sets working directory.',
                type: 'string',
                default: '.'
            }
        };
        this.handler = this.handler.bind(this);

        this.files = [
            '.editorconfig',
            '.eslintrc.json',
            '.gitignore',
            '.npmignore',
            '.travis.yml',
            'tsconfig.json',
            'tslint.json'
        ];
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(`configuring ${projectDir}`);

        Promise.all(this.files.map(f => this.copyFile(f, projectDir)))
            .then(results => this.logger.info('setup complete'))
            .catch(err => console.log(err));
    }

    copyFile(fileName, targetDir) {
        return new Promise((resolve, reject) => {
            const inputPath = path.join(__dirname, `.init/${fileName}`);
            const outputPath = path.join(targetDir, fileName);

            fs.readFile(inputPath, (err, data) => {
                if (err) {
                    this.logger.error(err);
                    reject(err);
                    return;
                }
                fs.writeFile(outputPath, data, (err) => {
                    if (err) {
                        this.logger.error(err);
                        reject(err);
                        return;
                    }
                    this.logger.info(`-> ${fileName}`);
                    resolve(fileName);
                });
            });
        });
    }

}

module.exports = new InitCommand();
