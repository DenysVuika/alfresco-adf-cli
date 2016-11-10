const path = require('path');
const rimraf = require('rimraf');
const logger = require('../util/logger');

const COMMAND_NAME = 'clean';

const defaultPaths = [
    'node_modules',
    'dist',
    'typings'
];

function cleanPaths (paths, rootDir, n) {
    if (n >= paths.length) {
        logger.info(COMMAND_NAME, 'cleaning finished');
        return;
    }
    let target = paths[n];

    let relPath = path.relative(rootDir, target);
    logger.info(COMMAND_NAME, `-> ${relPath}`);

    rimraf(target, (err) => {
        if (err) {
            logger.error(COMMAND_NAME, err);
        }
        cleanPaths(paths, rootDir, n + 1);
    });
}

module.exports = {
    command: 'clean [path] [dir..]',
    desc: 'Clean project',
    builder: {
        path: {
            default: '.'
        },
        dir: {
            default: []
        }
    },
    handler: function (argv) {
        const projectDir = path.resolve(argv.path);
        logger.info(COMMAND_NAME, `cleaning '${projectDir}'`);

        let dirs = argv.dir || [];
        if (dirs.length === 0) {
            dirs = defaultPaths.map(p => path.join(projectDir, p));
        }
        cleanPaths(dirs, projectDir, 0);
    }
};
