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
const { name, description, version } = require("../package.json")

console.log(`[${theTime()}] Starting compilation.`)

const cli = new Command()
const time: number = new Date().getTime()

cli
    .name(name)
    .description(description)
    .version(version)

cli.command('compile')
    .description('Compile vex source code')
    .argument('<path>', 'file path of source code')
    .action(() => {
        compile(cli.args, time)
    })

cli.parse()