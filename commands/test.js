const path = require('path');
const Logger = require('../util/logger');
const Server = require('karma').Server;

class TestCommand {

    constructor() {
        this.logger = new Logger('test');
        this.command = 'test [dir]';
        this.desc = 'Run tests for a given project directory';
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
        this.logger.info(`Starting tests`);

        const configFile = path.join(projectDir, '/karma.conf.js');

        const server = new Server({
            configFile: configFile,
            singleRun: true
        }, (exitCode) => {
            this.logger.info(`Karma has exited with ${exitCode}`);
            process.exit(exitCode);
        });
        server.start();
    }

}

module.exports = new TestCommand();
