# Vex
Vex is a hobby compiler for learning more about string manipulation and error handling. I would hope to rewrite the language in itself when the base compiler is finished. Currently the compiler is being written in TypeScript using the Bun Runtime.

## Dependencies
- [Bun](https://bun.sh)/[NodeJS](https://nodejs.org)
    - Node/Bun modules are listed in the package.json and can be installed with `bun install` or `npm install` from the project root
- [NASM](https://www.nasm.us/)
- [The GNU linker](https://ftp.gnu.org/old-gnu/Manuals/ld-2.9.1/html_mono/ld.html) (if you're on linux this is probably already available from the "ld" command)

## Bundle from source
```bash
bun run bundle
```

## Running
`source version`
```bash
bun run .
```
or
`bundled version`
```bash
bun run ./vex.js
```

## Features
- Pushing to stack (push x)
- Adding, subtracting, multiplying, and dividing (add, sub, mul, div)
- Equality and inequality (equal)
- Duplicate top element of stack (dup)
- Outputting to standard output (echo)

## To-do list
- [ ] Alternate sections and (functions?) other than _start and .text
- [ ] Reading user input
- [ ] More error handling
- [ ] Documentation
- [ ] Better syntax
- [ ] Rewrite in Vex

`This project is currently being written with in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.`
