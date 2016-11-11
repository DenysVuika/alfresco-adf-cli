# alfresco-adf-cli

Command line tools for Alfresco ADF

## Commands

- help
- init
- tslint
- clean
- version

## help

`adf --help`

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

## version

`adf --version`