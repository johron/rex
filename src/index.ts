import nasmify from "./compiler/codegen/nasm.ts";
import { unlinkSync } from "node:fs";

const { name, description, version } = require("../package.json")

const argv = process.argv.slice(2)
// arg example: bun start source.rex output

if (argv.length < 1) {
    console.error("rex: error: no arguments")
    process.exit(1)
}

let pauseFlag = false

let inputPath = ""
let outputPath = ""

if (argv[0] == "-v" || argv[0] == "--version") {
    console.log("rex: version: v" + version)
} else if (argv[0] == "-h" || argv[0] == "--help") {
    console.log("usage: [option] <source> <output>")
    console.log("options:")
    console.log("  -v, --version    print version")
    console.log("  -h, --help       print help")
    console.log("  -p, --pause      pause compilation")
    
} else if (argv[0] == "-p" || argv[0] == "--pause") {
    pauseFlag = true
} else {
    if (argv[0].startsWith("-")) {
        console.error("rex: error: invalid option: " + argv[0])
        process.exit(1)
    }
    
    // It *should* now be the input path
    inputPath = argv[0]
}

if (argv[1] && inputPath == "") {
    inputPath = argv[1]
}

if (argv[1] && inputPath != "") {
    outputPath = argv[1]
}

if (argv[2]) {
    outputPath = argv[2]
}

const file = Bun.file(inputPath)

if (!await file.exists()) {
    console.error("rex: error: invalid source path")
    process.exit(1)
}

const result = await nasmify(await file.text())

await Bun.write(outputPath + ".nasm", result)

if (!pauseFlag) {
    const proc1 = Bun.spawn(["nasm", "-felf64", outputPath + ".nasm"])
    await proc1.exited

    const proc2 = Bun.spawn(["ld", "-o", outputPath, outputPath + ".o"])
    await proc2.exited

    unlinkSync(outputPath + ".nasm")
    unlinkSync(outputPath + ".o")
}