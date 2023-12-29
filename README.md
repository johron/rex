# Vex
Vex is a hobby compiler for learning more about string manipulation and error handling. I would hope to rewrite the language in itself when the base compiler is finished. Currently the compiler is being written in TypeScript using the Bun Runtime.

## Installing dependencies
```bash
bun install
```

## Running
`View help message`
```bash
bun run .
```
`Compile vex source code`
```bash
bun run . compile <file>
```

## Features
- [x] Pushing to stack (push x)
- [x] Adding, subtracting, multiplying, and dividing (add, sub, mul, div)
- [x] Equality and inequality (equal)
- [x] Duplicate top element of stack (dup)
- [x] Outputting to standard output (echo)

## To-do list
- [ ] Alternate sections and (functions?) other than _start and .text
- [ ] Reading user input

`This project is currently being written with in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.`
