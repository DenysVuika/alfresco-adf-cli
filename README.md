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

## version

Shows program version number.

Examples:
```sh
adf --version
```