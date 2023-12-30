/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

export default class {
    constructor (message: string, line: string) {
        line = JSON.stringify(line)
        line = line.substring(1, line.length - 1)

        console.log(line)
        console.error("tvc: error: " + message)
        console.log("compilation aborted")
        process.exit(1)
    }
}