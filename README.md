# Rex
Rex is a hobby compiler for learning more about string manipulation and error handling. I would hope to rewrite the language in itself when the base compiler is finished. Currently the compiler is being written in TypeScript using the Bun Runtime.

`ONLY AVAILABLE FOR LINUX`

<img src="https://raw.githubusercontent.com/johanrong/image-host/main/rex.png" width="128" height="128"/>

## To-do list
- [ ] Functions and imports
- [ ] Reading user input
- [ ] More error handling
- [ ] Documentation
- [x] Better syntax
- [ ] Rewrite in Rex

## Dependencies
- [Bun](https://bun.sh)
    - Bun modules are listed in the package.json and can be installed with `bun install` from the project root
- [NASM](https://www.nasm.us/)
- [The GNU linker](https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_mono/ld.html) (if you're on linux this is probably already available from the "ld" command)

## Bundle
```bash
bun run bundle
```

## Compile
`source version`
```bash
bun start [flag] <input> <output>
```
or
`bundled version`
```bash
bun run ./rex.js [flag] <input> <output>
```
optional flags (only one flag can be used at a time):
- `-p: pause` - pauses the compilation step and only outputs the assembly

## Run the executable
```bash
./<output>
```
`require executable permissions?`
```bash
chmod +x <output>
```

`This project is currently being written with in bun v1.0.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.`
