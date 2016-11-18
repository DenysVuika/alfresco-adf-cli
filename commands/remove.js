const path = require('path');
const fs = require('fs-extra');
const Logger = require('../util/logger');

class RemoveCommand {

    constructor() {
        this.logger = new Logger('remove');
        this.command = 'remove [path..]';
        this.desc = 'Removes a file or directory.';
        this.builder = {
            path: {
                describe: 'Path(s) for file or directory to remove',
                default: []
            }
        };
        this.handler = this.handler.bind(this);
    }

    handler(argv) {
        let targets = (argv.path || []).map(f => path.resolve(f));
        if (targets.length > 0) {
            this.logger.info('Removing...');
            this.remove(targets, 0);
        }
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

module.exports = new RemoveCommand();
