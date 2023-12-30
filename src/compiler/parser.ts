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
import Symbol from "../enum/Symbol.ts";
import Type from "../enum/Type.ts";
import Error from "../logger/Error.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === Symbol.LBRACE) {
                openCount++
            } else if (tokens[j] === Symbol.RBRACE) {
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
    source = source.replaceAll(/\r+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '')
    let lines = source.split(/\n(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    let tokensArr: string[][] = []

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        // @ts-ignore
        tokensArr.push(lexer(lines[lineIndex]))
    }

    for (let lineIndex = 0; lineIndex < tokensArr.length; lineIndex++) {
        const tokens = tokensArr[lineIndex]

        for (let i = 0; i < tokens.length; i++) {

            if (getKey(tokens[i]) == Type.FLOAT) {
                if (tokens[i].replace(".", "").includes(".")) {
                    throw new Error("float contains multiple periods", lines[lineIndex])
                }
            } else if (tokens[i] == Symbol.LBRACE || tokens[i] == Symbol.RBRACE) {
                tokensArr[lineIndex][i] = ""
            }
        }
    }
    
    return tokensArr
}