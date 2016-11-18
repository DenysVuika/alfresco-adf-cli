const path = require('path');
const Logger = require('../util/logger');

class TestCommand {

    constructor() {
        this.logger = new Logger('test');
        this.command = 'test [dir] [coverage]';
        this.desc = 'Run tests for a given project directory';
        this.builder = {
            dir: {
                describe: 'Working directory',
                type: 'string',
                default: '.'
            },
            coverage: {
                alias: 'c',
                describe: 'Run code coverage report',
                type: 'boolean',
                default: false
            }
        };
        this.handler = this.handler.bind(this);
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(`Starting tests`);

        const configFile = path.join(projectDir, '/karma.conf.js');

        const Server = require('karma').Server;
        const server = new Server({
            configFile: configFile,
            singleRun: true
        }, (exitCode) => {
            if (argv.coverage) {
                this.logger.info('Running coverage');
                this.runCoverage(projectDir).then(() => {
                    this.logger.info('Done.');
                    process.exit(exitCode);
                });
            } else {
                // this.logger.info(`Karma has exited with ${exitCode}`);
                this.logger.info('Done.');
                process.exit(exitCode);
            }
        });
        server.start();
    }

    runCoverage(projectDir) {
        const remapIstanbul = require('remap-istanbul');

        const reportDir = path.join(projectDir, 'coverage/report');
        const sourcePath = path.join(reportDir, 'coverage-final.json');

        return remapIstanbul(sourcePath, {
            'json': path.join(reportDir, 'coverage-final.json'),
            'html': path.join(reportDir, 'html-report')
        });
    }

}

module.exports = new TestCommand();
