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

## Commands

- help
- init
- tslint
- clean
- remove
- serve
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


## clean

Cleans the project directory.

`clean [path] [dir..]`

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

## remove

Removes a file or directory. The directory can have contents. 

`remove [path...] `

Examples:
```sh
adf remove test1
adf remove test1 test2 test3
adf remove test*
```

## serve

`serve [path]`

Examples:
```sh
adf serve .
adf serve --open
```

For more information see internal help: `adf --help serve`.

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