const path = require('path');
const fs = require('fs-extra');
const Logger = require('../util/logger');

class CleanCommand {

    constructor() {
        this.logger = new Logger('clean');
        this.command = 'clean [dir..]';
        this.desc = 'Clean project';
        this.builder = {
            dir: {
                describe: 'Project directory',
                type: 'array',
                default: []
            }
        };
        this.handler = this.handler.bind(this);

        this.defaultPaths = [
            'node_modules',
            'dist',
            'typings'
        ];
    }

    handler(argv) {
        let dirs = argv.dir || [];

        if (dirs.length === 0) {
            dirs.push('.');
        }

        let paths = [];

        dirs.forEach((d) => {
            let projectDir = path.resolve(d);
            this.defaultPaths.forEach(p => {
                paths.push(path.join(projectDir, p));
            });
        });

        this.logger.info('Cleaning projects...');
        // console.dir(paths);
        this.remove(paths, 0);
    }

    remove(paths, n) {
        if (n >= paths.length) {
            this.logger.info('Done');
            return;
        }
        let target = paths[n];

        fs.remove(target, (err) => {
            if (err) {
                this.logger.error(err);
            }
            this.remove(paths, n + 1);
        });
    }
}

module.exports = new CleanCommand();
