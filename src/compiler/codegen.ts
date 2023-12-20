/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { TokenType } from "./lexer"
import parser from "./parser"

export default async function (source: string) {
    const tokens = await parser(source)
    console.log(tokens)

    for (let line = 0; tokens.length; line++) {
        for (let word = 0; tokens[line].length; word++) {
            let token = tokens[line][word]

            if (token == TokenType.VAL) {
                if ()
            }
        }
    }
}