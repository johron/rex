/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Command } from 'commander'
import compile from './command/compile'
import theTime from "./util/theTime.ts";
import Warn from "./logger/Warn.ts";
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
    if (!assemble) new Warn("-l is ignored without -a")
    link = true
}
    

compile(cli.args, assemble, link)