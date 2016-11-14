const path = require('path');
const Logger = require('../util/logger');

class ServeCommand {

    constructor() {
        this.commandName = 'serve';
        this.command = 'serve [dir]';
        this.desc = 'Serve web app';
        this.logger = new Logger('serve');
        this.builder = {
            a: {
                alias: 'address',
                describe: 'Address to use.',
                type: 'string',
                default: '0.0.0.0'
            },
            p: {
                alias: 'port',
                describe: 'Port to use.',
                type: 'number',
                default: 3000
            },
            d: {
                alias: 'dir',
                describe: 'Sets working directory.',
                type: 'string',
                default: '.'
            },
            s: {
                alias: 'spa',
                describe: 'Enables SPA (Single Page Application) support.',
                type: 'boolean',
                default: true
            },
            o: {
                alias: 'open',
                describe: 'Opens browser window after starting the server.',
                type: 'boolean',
                default: false
            },
            O: {
                alias: 'open-url',
                describe: 'Opens browser window at specific url after starting the server.',
                type: 'string',
                default: null
            },
            l: {
                alias: 'livereload',
                describe: 'Enable live reload support.',
                type: 'boolean',
                default: true
            },
            w: {
                alias: 'watch',
                describe: 'Additional files to watch for live reload.',
                type: 'array',
                default: []
            },
            V: {
                alias: 'verbose',
                describe: 'Enables verbose output.',
                type: 'boolean',
                default: false
            },
            /*
            c: {
                alias: 'config',
                describe: 'Path to custom configuration file.',
                type: 'string'
            },
            */
            x: {
                alias: 'ext',
                describe: 'Server extensions',
                type: 'array',
                default: []
            }
        };
        this.handler = this.handler.bind(this);
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(this.commandName, projectDir);
        process.chdir(projectDir);

        let config = {
            host: argv.address,
            port: argv.port,
            dir: argv.dir,
            spa: argv.spa,
            open: argv.open,
            openUrl: argv.openUrl,
            livereload: argv.livereload,
            watch: argv.w,
            verbose: argv.verbose,
            ext: argv.ext
        };

        if (argv.verbose) {
            console.log(config);
        }
        const Server = require('wsrv');
        new Server(config).start();
    }

}

module.exports = new ServeCommand();
