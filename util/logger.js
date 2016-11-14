const chalk = require('chalk');

class Logger {

    constructor(prefix) {
        this.prefix = prefix || 'adf';
    }

    info(message) {
        if (message) {
            let header = chalk.green(this.prefix);
            console.log(`${header}: ${message}`);
        }
    }

    error(message) {
        if (message) {
            let header = chalk.green(this.prefix);
            let error = chalk.bold.red;
            console.log(`${header}: ${error(message)}`);
        }
    }

}

module.exports = Logger;
