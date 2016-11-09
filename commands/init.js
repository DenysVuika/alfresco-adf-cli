const path = require('path');

module.exports = {
    command: 'init [dir]',
    desc: 'Create an empty repo',
    builder: {
        dir: {
            default: '.'
        }
    },
    handler: function (argv) {
        console.log('init called for dir', argv.dir);
        console.log(path.resolve(argv.dir));
    }
};
