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

const cli = new Command()

cli
    .name(name)
    .description(description)
    .version(version)
    .argument('<source>', 'source path')
    .argument('<output>', 'output path')
    .action(() => {
        compile(cli.args, new Date().getTime())
    })

cli.parse()