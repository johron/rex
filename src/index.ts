import { Command } from 'commander';
import compile from './command/compile';
const cli = new Command();

const { name, description, version } = require("../package.json")

cli
    .name(name)
    .description(description)
    .version(version);

cli.command('compile')
    .description('Compile bader source code')
    .argument('<path>', 'file path of source code')
    .action(() => {
        compile(cli.args)
    });

cli.parse();