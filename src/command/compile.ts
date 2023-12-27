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

export default async function(args: string[], time: number) {
    const path: string = args[1]
    const name: string = args[1].split("/")[args.length - 1].split(".")[args.length - 2]
    const file = Bun.file(path)

    if (!await file.exists()) {
        console.error("file not found")
        process.exit(1)
    }

    const result: string = await codegen(await file.text())
    await Bun.write(`build/${name}.lua`, result)

    console.log(`[${theTime()}] Completed compilation in ${new Date().getTime() - time}ms.`)
}