/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import codegen from "../compiler/codegen";

export default async function(args: string[], assemble: boolean, link: boolean) {
    const source: string = args[0]
    const output: string = args[1]
    const file = Bun.file(source)

    if (!await file.exists()) {
        console.error("vex: error: invalid source path")
        console.log("compilation aborted")
        process.exit(1)
    }

    const startTime = new Date().getTime()
    console.log(`vex: info: starting compilation`)
    
    const result: string = await codegen(await file.text())
    await Bun.write(output, result)
    console.log(`vex: info: wrote assembly in ${new Date().getTime() - startTime}ms`)
    
    if (assemble) {
        const procStartTime = new Date().getTime()
        const proc = Bun.spawn(["nasm", "-felf64", output])
        await proc.exited
        console.log(`vex: info: assembled in ${new Date().getTime() - procStartTime}ms`)

        if (link) {
            const procStartTime = new Date().getTime()
            const proc = Bun.spawn(["ld", "-o", output.split(".")[0], output.split(".")[0] + ".o"])
            await proc.exited
            console.log(`vex: info: linked in ${new Date().getTime() - procStartTime}ms`)
        }
    }
    
    console.log(`vex: info: compilation completed in ${new Date().getTime() - startTime}ms`)
}