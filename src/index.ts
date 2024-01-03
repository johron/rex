import { Command } from 'commander'
import compile from './command/compile'
const { name, description, version } = require("../package.json")

const cli = new Command()

cli
    .name(name)
    .description(description)
    .version(version, '-v', '--version')
    .argument('<source>', 'source path')
    .argument('<output>', 'output path')
    .option('-a', 'assemble with "nasm"')
    .option('-l', 'link with "ld"')
    .option('-r', 'run')
    //.action(() => {})

cli.parse(process.argv)

const options = cli.opts()

let assemble = false
let link = false

if (options.a == true) assemble = true
if (options.l == true) {
    if (!assemble) {
        console.log("rex: warning: -l is ignored without -a")
    }
    link = true
}
    

compile(cli.args, assemble, link)