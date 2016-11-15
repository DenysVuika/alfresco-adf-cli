const path = require('path');
const fs = require('fs-extra');
const Logger = require('../util/logger');

class InitCommand {

    constructor() {
        this.logger = new Logger('init');
        this.command = 'init [dir]';
        this.desc = 'Setup new ADF project';
        this.builder = {
            dir: {
                describe: 'Working directory',
                type: 'string',
                default: '.'
            }
        };
        this.handler = this.handler.bind(this);
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(`Configuring ${projectDir}`);

        let items = [];
        const sourceDir = path.join(__dirname, '.init');
        fs.walk(sourceDir)
            .on('data', (item) => {
                if (item.path !== sourceDir && item.stats.isFile()) {
                    items.push(item.path);
                }
            })
            .on('end', () => {
                this.logger.info('Writing files...');

                Promise.all(items.map(sourcePath => {
                    let relativePath = path.relative(sourceDir, sourcePath);
                    let targetPath = path.join(projectDir, relativePath);
                    return this.copyFile(sourcePath, targetPath, relativePath);
                }))
                .then(results => this.logger.info('setup complete'))
                .catch(err => console.log(err));
            });
    }

    copyFile(sourcePath, targetPath, relativePath) {
        return new Promise((resolve, reject) => {
            fs.copy(sourcePath, targetPath, (err) => {
                if (err) {
                    this.logger.error(err);
                    return reject(err);
                }
                // this.logger.info(`-> ${relativePath}`);
                return resolve(targetPath);
            });
        });
    }
}

module.exports = new InitCommand();
