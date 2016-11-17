const path = require('path');
const fs = require('fs');
const Linter = require('tslint');
const Logger = require('../util/logger');

class TslintCommand {

    constructor() {
        this.logger = new Logger('tslint');
        this.command = 'tslint [dir]';
        this.desc = 'Run TSLint for a given project directory';
        this.handler = this.handler.bind(this);
        this.builder = {
            dir: {
                describe: 'Working directory',
                type: 'string',
                default: '.'
            }
        };
    }

    handler(argv) {
        const projectDir = path.resolve(argv.dir);
        this.logger.info(projectDir);
        process.chdir(projectDir);

        const rulesFile = path.join(__dirname, '.tslint/tslint.json');
        const configPath = path.join(projectDir, 'tsconfig.json');

        fs.stat(configPath, (err, stats) => {
            if (err) {
                let message = 'error running tslint for a given path';
                if (err.code === 'ENOENT') {
                    message = 'tsconfig.json file not found';
                }
                this.logger.error(message);
                process.exit(1);
                return;
            }
            if (stats.isFile()) {
                const program = Linter.createProgram('tsconfig.json', projectDir);
                const files = Linter.getFileNames(program);
                // console.log(files);

                const results = files.map(file => {
                    const fileContents = program.getSourceFile(file).getFullText();
                    const configuration = Linter.findConfiguration(rulesFile, file);

                    const options = {
                        configuration: configuration,
                        formatter: null,
                        rulesDirectory: null,
                        formattersDirectory: null
                    };
                    const linter = new Linter(file, fileContents, options, program);
                    return linter.lint();
                });

                let hasFailures = false;
                if (results && results.length > 0) {
                    results.forEach(r => {
                        if (r.failureCount > 0) {
                            hasFailures = true;
                            this.logFailures(r.failures, projectDir);
                        }
                    });
                }
                if (hasFailures) {
                    process.exit(1);
                } else {
                    this.logger.info('linting complete');
                }
            } else {
                this.logger.error('tsconfig.json file not found');
            }
        });
    }

    logFailures(failures, rootPath) {
        failures = failures || [];
        failures.forEach(failure => {
            let fileName = failure.getFileName();
            if (rootPath) {
                fileName = path.relative(rootPath, fileName);
            }
            let failureString = failure.getFailure();
            let lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            let position = `[${lineAndCharacter.line + 1}, ${lineAndCharacter.character + 1}]`;
            this.logger.error(`${fileName}${position}: ${failureString}`);
        });
    }
}

module.exports = new TslintCommand();
