/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import isAlpha from "../util/isAlpha"
import isNumeric from "../util/isNumeric"
import Instruction from "../enum/Instruction.ts";
import Symbol from "../enum/Symbol.ts";
import Type from "../enum/Type.ts";
import SyntaxError from "../error/SyntaxError.ts";

function has(check: string, fromArr: string[], startIndex: number) {
    let checkArr = check.split("")

    for (let i = 0; i < checkArr.length; i++) {
        if (fromArr[startIndex + i] != checkArr[i]) {
            return false
        }
    }

    return true
}

export default function (line: string) {
    const charArr: string[] = line.split("")
    let tokenArr: string[] = []
    
    if (charArr.length == 0) return []

    for (let i = 0; i < charArr.length; i++) {
        const c = charArr[i]
        
        if (c == "\t" || c =="\f") return ""
        
        if (has("//", charArr, i)) {
            return []
        } else if (has("add", charArr, i)) {
            tokenArr.push(Instruction.ADD)
            i += 2
        } else if (has("sub", charArr, i)) {
            tokenArr.push(Instruction.SUB)
            i += 2
        } else if (has("mul", charArr, i)) {
            tokenArr.push(Instruction.MUL)
            i += 2
        } else if (has("div", charArr, i)) {
            tokenArr.push(Instruction.DIV)
            i += 2
        } else if (has("inc", charArr, i)) {
            tokenArr.push(Instruction.INC)
            i += 2
        } else if (has("dec", charArr, i)) {
            tokenArr.push(Instruction.DEC)
            i += 2
        } else if (has("run", charArr, i)) {
            tokenArr.push(Instruction.RUN)
            i += 3
        } else if (has("ret", charArr, i)) {
            tokenArr.push(Instruction.RET)
            i += 2
        } else if (has("push", charArr, i)) {
            tokenArr.push(Instruction.PUSH)
            i += 3
        } else if (has("equal", charArr, i)) {
            tokenArr.push(Instruction.EQUAL)
            i += 4
        } else if (has("exit", charArr, i)) {
            tokenArr.push(Instruction.EXIT)
            i += 3
        } else if (has("dup", charArr, i)) {
            tokenArr.push(Instruction.DUP)
            i += 2
            
        // Symbols
        } else if (has(",", charArr, i)) {
            tokenArr.push(Symbol.COMMA)
        } else if (has(".", charArr, i)) {
            tokenArr.push(Symbol.PERIOD)
        } else if (has("{", charArr, i)) {
            tokenArr.push(Symbol.LBRACKET)
        } else if (has("}", charArr, i)) {
            tokenArr.push(Symbol.RBRACKET)
        } else if (has("->", charArr, i)) {
            tokenArr.push(Symbol.ARROW)
            i += 1
        } else if (isNumeric(c)) {
            let number = ""
            let j = i
            let broke = false

            for (j; j < charArr.length; j++) {
                if (isNumeric(charArr[j]) || charArr[j] == ".") {
                    number += charArr[j]
                } else {
                    broke = true
                    break
                }
            }

            if (broke) i += (j - i) - 1
            else i += j - i

            if (number.includes(".")) tokenArr.push(Type.FLOAT + ":" + number)
            else tokenArr.push(Type.INTEGER + ":" + number)
        } else if (c == '"') {
            let string: string = ''
            let j = i + 1

            for (i; j < charArr.length; j++) {
                if (charArr[j] == '"') {
                    string += ''
                    break
                }
                
                string += charArr[j]
            }

            i += j - i
            tokenArr.push(Type.STRING + ":" + string)
        } else if (isAlpha(c)) {
            let combined = ""
            let j = i

            for (j; j < charArr.length; j++) {
                if (isAlpha(charArr[j])) {
                    combined += charArr[j]
                } else {
                    break
                }
            }

            i += j - i - 1
            tokenArr.push(Type.LITERAL + ":" + combined)
        } else if (charArr[i] == undefined || charArr[i] == " ")  {
            continue
        } else {
            throw new SyntaxError("Unexpected token found during lexing: " + c, line)
        }
    }

    return tokenArr
}