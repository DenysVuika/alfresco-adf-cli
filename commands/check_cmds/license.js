const path = require('path');
const glob = require('glob');
const fs = require('fs');
const Logger = require('../../util/logger');

class CheckLicenseCommand {

    constructor() {
        this.logger = new Logger('license');
        this.command = 'license [dir] [pattern] [ignore]';
        this.desc = 'Runs license check';
        this.builder = {
            dir: {
                describe: 'Working directory',
                type: 'string',
                default: '.'
            },
            pattern: {
                alias: 'p',
                describe: 'File pattern(s)',
                type: 'array',
                default: ['**/*.js']
            },
            ignore: {
                alias: 'i',
                describe: 'Ignore pattern(s)',
                type: 'array',
                default: ['**/node_modules/**']
            }
        };

        this.handler = this.handler.bind(this);

        this.alwaysIgnore = [
            '**/node_modules/**',
            '**/karma-test-shim.js',
            '**/karma.conf.js',
            '**/systemjs.config.js'
        ];
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(`Checking license headers`);

        let headerPath = path.join(__dirname, '.license/header.txt');
        let headerTemplate = fs.readFileSync(headerPath, 'utf8').trim();

        let ignore = argv.ignore || [];
        this.alwaysIgnore.forEach(rule => {
            if (ignore.indexOf(rule) === -1) {
                ignore.push(rule);
            }
        });

        let options = {
            cwd: projectDir,
            nodir: true,
            ignore: ignore
        };

        this.hasFailures = false;
        this.check(options, argv.pattern, 0, headerTemplate);
    }

    check(options, patterns, n, template) {
        if (n >= patterns.length) {
            this.logger.info('Done.');
            if (this.hasFailures) {
                process.exit(1);
            }
            return;
        }

        let pattern = patterns[n];
        glob(pattern, options, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }

            Promise
                .all(files.map(f => {
                    let targetPath = path.join(options.cwd, f);
                    return this.validate(targetPath, template);
                }))
                .then(() => this.check(options, patterns, n + 1, template))
                .catch(err => console.log(err));
        });
    }

    validate(targetPath, template) {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(targetPath, {
                start: 0,
                end: template.length - 1,
                encoding: 'utf8'
            });
            let data = '';
            stream.on('data', (chunk) => { data += chunk; });
            stream.on('error', (err) => this.logger.error(err.message));
            stream.on('end', () => {
                let isValid = data === template;
                if (!isValid) {
                    this.hasFailures = true;
                    this.logger.error(targetPath);
                }
                resolve(isValid);
            });
        });
    }

}

module.exports = new CheckLicenseCommand();
