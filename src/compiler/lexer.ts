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

function has(check: string, fromArr: string[], startIndex: number) {
    let checkArr = check.split("")

    for (let i = 0; i < checkArr.length; i++) {
        if (fromArr[startIndex + i] != checkArr[i]) {
            return false
        }
    }

    return true
}

export default function (tokenString: string) {
    const tokens = tokenString.split("")
    let tokenArr: string[] = []
    
    for (let token = 0; token < tokens.length; token++) {
        const c = tokens[token]
        
        if (c == "\t" || c == "\f" || c == "\n" || c == "\r" || c == " ") continue
        
        if (has("add", tokens, token)) {
            tokenArr.push(Instruction.ADD)
            token += 2
        } else if (has("sub", tokens, token)) {
            tokenArr.push(Instruction.SUB)
            token += 2
        } else if (has("mul", tokens, token)) {
            tokenArr.push(Instruction.MUL)
            token += 2
        } else if (has("div", tokens, token)) {
            tokenArr.push(Instruction.DIV)
            token += 2
        } else if (has("inc", tokens, token)) {
            tokenArr.push(Instruction.INC)
            token += 2
        } else if (has("dec", tokens, token)) {
            tokenArr.push(Instruction.DEC)
            token += 2
        } else if (has("puts", tokens, token)) {
            tokenArr.push(Instruction.PUTS)
            token += 3
        } else if (has("put", tokens, token)) {
            tokenArr.push(Instruction.PUT)
            token += 2
        } else if (has("ret", tokens, token)) {
            tokenArr.push(Instruction.RET)
            token += 2
        } else if (has("push", tokens, token)) {
            tokenArr.push(Instruction.PUSH)
            token += 3
        } else if (has("dup", tokens, token)) {
            tokenArr.push(Instruction.DUP)
            token += 2
        } else if (has("equal", tokens, token)) {
            tokenArr.push(Instruction.EQUAL)
            token += 4
        } else if (has("fun", tokens, token)) {
            tokenArr.push(Instruction.FUN)
            token += 3
        } else if (has("do", tokens, token)) {
            tokenArr.push(Instruction.DO)
            token += 1
        } else if (has("end", tokens, token)) {
            tokenArr.push(Instruction.END)
            token += 2
        } else if (has("exit", tokens, token)) {
            tokenArr.push(Instruction.EXIT)
            token += 3
        } else if (has(",", tokens, token)) {
            tokenArr.push(Symbol.COMMA)
        } else if (has(".", tokens, token)) {
            tokenArr.push(Symbol.PERIOD)
        } else if (isNumeric(c)) {
            let number = ""
            let j = token
            let broke = false

            for (j; j < tokens.length; j++) {
                if (isNumeric(tokens[j]) || tokens[j] == ".") {
                    number += tokens[j]
                } else {
                    broke = true
                    break
                }
            }

            if (broke) token += (j - token) - 1
            else token += j - token

            if (number.includes(".")) tokenArr.push(Type.FLOAT + ":" + number)
            else tokenArr.push(Type.INTEGER + ":" + number)
        } else if (c == '"') {
            let string: string = ''
            let j = token + 1

            for (token; j < tokens.length; j++) {
                if (tokens[j] == '"') {
                    string += ''
                    break
                }

                string += tokens[j]
            }

            token += j - token
            tokenArr.push(Type.STRING + ":" + string)
        } else if (isAlpha(c)) {
            let combined = ""
            let j = token

            for (j; j < tokens.length; j++) {
                if (isAlpha(tokens[j])) {
                    combined += tokens[j]
                } else {
                    break
                }
            }

            token += j - token - 1
            tokenArr.push(Type.LITERAL + ":" + combined)
        } else {
            console.log("unexpected token found during lexing: " + c)
            process.exit(1)
        }
    }
    
    return tokenArr
}