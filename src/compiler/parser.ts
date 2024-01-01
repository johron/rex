/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import lexer from "./lexer";
import getKey from "../util/getKey.ts";
import Type from "../enum/Type.ts";
import Instruction from "../enum/Instruction.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === Instruction.DO) {
                openCount++
            } else if (tokens[j] === Instruction.END) {
                openCount--

                if (openCount === 0) {
                    return true
                }
            }
        }
    }

    return false
}

export default async function (source: string) {
    let tokenArr = lexer(source)

    for (let token = 0; token < tokenArr.length; token++) {
        if (getKey(tokenArr[token]) == Type.FLOAT) {
            if (tokenArr[token].replace(".", "").includes(".")) {
                console.log("float contains multiple periods: " + tokenArr[token])
                process.exit(1)
            }
        } else if (tokenArr[token] == Instruction.DO || tokenArr[token] == Instruction.END) {
            tokenArr[token] = ""
        }
    }

    return tokenArr
}