exports.command = 'check <command>';
exports.desc = 'Runs project check';
exports.builder = function(yargs) {
    return yargs.commandDir('check_cmds');
};
exports.handler = function(argv) {};
