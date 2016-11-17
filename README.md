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

`--help [command]`

Examples:
```sh
adf --help
adf --help serve
```

## init

`init [dir]`

Examples:
```sh
adf init
adf init .
adf init project/folder
```

## tslint

Runs TSlint for a given project directory using embedded rules.  
Your project does not need to have `tslint.json` installed however `tsconfig.json` is required.

`tslint [dir]`

Examples:
```sh
adf tslint
adf tslint .
adf tslint project/folder
```

## clean

Cleans the project directory.  
Automatically removes the following subdirectories:

- node_modules/
- dist/
- typings/

`clean [path] [dir..]`

Examples:
```sh
adf clean
adf clean .
adf clean project1 project2 project3
adf clean project*
```

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