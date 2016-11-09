const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

function logInfo (message) {
    if (message) {
        let prefix = chalk.green('clean');
        console.log(`${prefix}: ${message}`);
    }
}

function logError (message) {
    if (message) {
        let prefix = chalk.green('clean');
        var error = chalk.bold.red;
        console.log(`${prefix}: ${error(message)}`);
    }
}

const defaultPaths = [
    'node_modules',
    'dist',
    'typings'
];

function cleanPaths (paths, rootDir, n) {
    if (n >= paths.length) {
        logInfo('cleaning finished');
        return;
    }
    let target = paths[n];
    rimraf(target, (err) => {
        if (err) {
            logError(err);
        }
        cleanPaths(paths, rootDir, n + 1);
    });
}

module.exports = {
    command: 'clean [dir]',
    desc: 'Clean project',
    builder: {
        dir: {
            default: '.'
        }
    },
    handler: function (argv) {
        const projectDir = path.resolve(argv.dir);
        logInfo(`cleaning '${projectDir}'`);
        cleanPaths(defaultPaths, projectDir, 0);
    }
};


