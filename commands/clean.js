const path = require('path');
const rimraf = require('rimraf');
const Logger = require('../util/logger');

class CleanCommand {

    constructor() {
        this.logger = new Logger('clean');
        this.command = 'clean [path] [dir..]';
        this.desc = 'Clean project';
        this.builder = {
            path: {
                describe: 'Sets working directory.',
                type: 'string',
                default: '.'
            },
            dir: {
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
        const projectDir = path.resolve(argv.path);
        this.logger.info(`cleaning '${projectDir}'`);

        let dirs = argv.dir || [];
        if (dirs.length === 0) {
            dirs = this.defaultPaths.map(p => path.join(projectDir, p));
        }
        this.cleanPaths(dirs, projectDir, 0);
    }

    cleanPaths(paths, rootDir, n) {
        if (n >= paths.length) {
            this.logger.info('cleaning finished');
            return;
        }
        let target = paths[n];

        let relPath = path.relative(rootDir, target);
        this.logger.info(`-> ${relPath}`);

        rimraf(target, (err) => {
            if (err) {
                this.logger.error(err);
            }
            this.cleanPaths(paths, rootDir, n + 1);
        });
    }
}

module.exports = new CleanCommand();
