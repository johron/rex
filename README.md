# Rex
Rex is a hobby compiler for learning more about string manipulation and error handling. I would hope to rewrite the language in itself when the base compiler is finished. Currently the compiler is being written in TypeScript using the Bun Runtime.
`ONLY AVAILABLE FOR LINUX`

<img src="https://raw.githubusercontent.com/johanrong/image-host/main/rex.png" width="128" height="128"/>

## To-do list
- [ ] Alternate sections and (functions?) other than _start and .text
- [ ] Reading user input
- [ ] More error handling
- [ ] Documentation
- [ ] Better syntax
- [ ] Rewrite in Rex

## Dependencies
- [Bun](https://bun.sh)
    - Bun modules are listed in the package.json and can be installed with `bun install` from the project root
- [NASM](https://www.nasm.us/)
- [The GNU linker](https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_mono/ld.html) (if you're on linux this is probably already available from the "ld" command)

## Bundle from source
```bash
bun run bundle
```

## Run rex compiler
`source version`
```bash
bun start <source> <output>
```
or
`bundled version`
```bash
bun run ./rex.js <source> <output>
```
optional arguments:
`-a: assemble`, `-l: link` (`-l is ignored without -a`)

## Assemble and link the assembly
Unnecessary if you used the `-a` and `-l` flags
```bash
nasm -felf64 build/<file>.asm
ld -o build/<file> build/<file>.o
```

## Run the executable
```bash
./build/<file>
```
`need executable permissions?`
```bash
chmod +x ./build/<file>
```

`This project is currently being written with in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.`
