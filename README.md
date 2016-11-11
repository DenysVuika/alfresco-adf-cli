# alfresco-adf-cli

Command line tools for Alfresco ADF

## Commands

- help
- init
- tslint
- clean
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

`tslint [dir]`

Examples:
```sh
adf tslint
adf tslint .
adf tslint project/folder
```

## clean

`clean [path] [dir..]`

Examples:
```sh
adf clean
adf clean .
adf clean project/folder
adf clean . folder1 folder2
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