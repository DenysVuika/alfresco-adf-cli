# alfresco-adf-cli

Command line tools for Alfresco ADF

## Installing

```sh
npm install -g alfresco-adf-cli
```

Alternatively you can install as part of your project:

```sh
npm install --save-dev alfresco-adf-cli
```

### Using with Travis CI

**.travis.yml**
```yml
before_install:
- npm install -g alfresco-adf-cli
```

## Commands

- help
- init
- tslint
- clean
- remove
- serve
- test
- check
    * license
- version

## help

Shows general help information or help details for a given command.

`--help [command]`

Examples:
```sh
adf --help
adf --help serve
adf help test
```

## init

Setup default project.

`init [dir]`

Examples:
```sh
adf init
adf init .
adf init project/folder
```

Puts the following files into target directory:

- .editorconfig
- .eslintrc.json
- .gitignore
- .npmignore
- .travis.yml
- .tsconfig.json
- .tslint.json 

For more information see internal help: `adf help init`.

## tslint

Runs TSlint for a given project directory using embedded rules.

`tslint [dir]`

Examples:
```sh
adf tslint
adf tslint .
adf tslint project/folder
```

Your project does not need to have `tslint.json` installed however `tsconfig.json` is required.

For more information see internal help: `adf help tslint`.

## clean

Cleans the project directory.

`clean [dir..]`

Examples:
```sh
adf clean
adf clean .
adf clean project1 project2 project3
adf clean project*
```

Automatically removes the following subdirectories:

- node_modules/
- dist/
- typings/
- coverage/

For more information see internal help: `adf help clean`.

## remove

Removes a file or directory. The directory can have contents. 

`remove [path..] `

Examples:
```sh
adf remove test1
adf remove test1 test2 test3
adf remove test*
```

For more information see internal help: `adf help remove`.

## serve

`serve [path]`

Examples:
```sh
adf serve .
adf serve --open
```

For more information see internal help: `adf help serve`.

## test

Runs unit tests for a given project folder(s).  
Allows generating and opening coverage reports.

`adf test [dir] [coverage] [open]`

Exasmples:
```sh
adf test
adf test project1
adf test --coverage --open
``` 

Uses Karma test runner with Jasmine for tests by default.  
The following libraries are bundled so you don't need installing them for your project:

- jasmine-core
- karma
- karma-chrome-launcher
- karma-coverage
- karma-jasmine
- karma-jasmine-ajax
- karma-jasmine-html-reporter
- karma-mocha-reporter
- remap-istanbul

For more information see internal help: `adf help test`.

## check

For more details on commands refer to inline help:

```sh
adf help check
```

Supported sub-commands:

- license

### license

Runs license header check for a given folder(s).

`adf check license [dir] [pattern] [ignore]`

For more details refer to inline help:

```sh
adf help check license
```

Examples:
```sh
adf check license
adf check license project1/
adf check license --pattern '**/*.ts'
adf check license --pattern '**/*.js' '**/!(index).ts' --ignore '**/*.d.ts'
```

_This command does not load full content of a file during check 
and uses streaming to minimise memory footprint._

## version

Shows program version number.

Examples:
```sh
adf --version
```