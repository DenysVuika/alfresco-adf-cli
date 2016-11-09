const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const Linter = require('tslint');

function logInfo (message) {
    if (message) {
        let prefix = chalk.green('tslint');
        console.log(`${prefix}: ${message}`);
    }
}

function logError (message) {
    if (message && message.trim()) {
        let prefix = chalk.green('tslint');
        var error = chalk.bold.red;
        console.log(`${prefix}: ${error(message.trim())}`);
    }
}

function logFailures (failures, rootPath) {
    failures = failures || [];
    failures.forEach(failure => {
        let fileName = failure.getFileName();
        if (rootPath) {
            fileName = path.relative(rootPath, fileName);
        }
        let failureString = failure.getFailure();
        let lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
        let position = `[${lineAndCharacter.line + 1}, ${lineAndCharacter.character + 1}]`;
        logError(`${fileName}${position}: ${failureString}`);
    });
}

module.exports = {
    command: 'tslint [dir]',
    desc: 'Run TSLint for a given directory',
    builder: {
        dir: {
            default: '.'
        }
    },
    handler: function (argv) {
        const projectDir = path.resolve(argv.dir);
        logInfo(projectDir);
        process.chdir(projectDir);

        const rulesFile = path.join(__dirname, 'tslint/tslint.json');
        const configPath = path.join(projectDir, 'tsconfig.json');

        fs.stat(configPath, (err, stats) => {
            if (err) {
                let message = 'error running tslint for a given path';
                if (err.code === 'ENOENT') {
                    message = 'tsconfig.json file not found';
                }
                logError(message);
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
                            logFailures(r.failures, projectDir);
                        }
                    });
                }
                if (hasFailures) {
                    process.exit(1);
                } else {
                    logInfo('linting complete');
                }
            } else {
                logError('tsconfig.json file not found');
            }
        });
    }
};
