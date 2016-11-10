const chalk = require('chalk');

class Logger {

    info (prefix, message) {
        if (message) {
            let header = chalk.green(prefix);
            console.log(`${header}: ${message}`);
        }
    }

    error (prefix, message) {
        if (message) {
            let header = chalk.green(prefix);
            let error = chalk.bold.red;
            console.log(`${header}: ${error(message)}`);
        }
    }

}

module.exports = new Logger();
