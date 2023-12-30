/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import codegen from "../compiler/codegen";
import theTime from "../util/theTime.ts";
import * as pathjs from "path";

export default async function(args: string[], startTime: number) {
    const source: string = args[0]
    const output: string = args[1]
    const file = Bun.file(source)

    if (!await file.exists()) {
        console.error("file not found")
        process.exit(1)
    }

    console.log(`[${theTime()}] Starting compilation.`)
    
    const result: string = await codegen(await file.text())
    await Bun.write(output, result)
    console.log(`[${theTime()}] Compilation completed in ${new Date().getTime() - startTime}ms.`)
}