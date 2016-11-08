#!/usr/bin/env node
require('yargs')
    .command(['start [app]', 'run', 'up'], 'Start up an app', {}, (argv) => {
        console.log('starting up the', argv.app || 'default', 'app');
    })
    .command({
        command: 'configure <key> [value]',
        aliases: ['config', 'cfg'],
        desc: 'Set a config variable',
        builder: (yargs) => yargs.default('value', 'true'),
        handler: (argv) => {
            console.log(`setting ${argv.key} to ${argv.value}`);
        }
    })
    .demand(1)
    .help()
    .wrap(72)
    .argv;
