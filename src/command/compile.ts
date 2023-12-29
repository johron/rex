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
import promisify from "node:util"
import { exec as _exec } from "node:child_process"

export default async function(args: string[], startTime: number) {
    const path: string = args[1]
    const name: string = args[1].split("/")[args.length - 1].split(".")[args.length - 2]
    const file = Bun.file(path)

    if (!await file.exists()) {
        console.error("file not found")
        process.exit(1)
    }

    let time = new Date().getTime()
    const result: string = await codegen(await file.text())
    await Bun.write(`build/${name}.asm`, result)
    console.log(`[${theTime()}] Wrote assembly in ${new Date().getTime() - time}ms.`)
    time = new Date().getTime()
    const exec = promisify(_exec)
    await exec(`nasm -felf64 build/${name}.asm`)
    console.log(`[${theTime()}] Assembled in ${new Date().getTime() - time}ms.`)
    time = new Date().getTime()
    await exec(`ld build/${name}.o -o build/${name}`)
    console.log(`[${theTime()}] Linked in ${new Date().getTime() - time}ms.`)

    console.log(`[${theTime()}] Completed compilation in ${new Date().getTime() - startTime}ms.`)
}