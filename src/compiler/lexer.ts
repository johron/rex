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

export enum TokenType {
    // Keywords
    VAL = "VAL",
    FUNC = "FUNC",
    IF = "IF",
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    RETURN = "RETURN",

    // Literals
    LITERAL = "LITERAL",
    NUMBER = "NUMBER",
    STRING = "STRING",

    // Symbols
    PLUS = "PLUS",
    MINUS = "MINUS",
    ASTERISK = "ASTERISK",
    SLASH = "SLASH",
    GREATER = "GREATER",
    LESS = "LESS",
    EQUALS = "EQUALS",
    NOT = "NOT",
    DOUBLEEQUALS = "DOUBLEEQUALS",
    GREATEREQUALS = "GREATEREQUALS",
    LESSEQUALS = "LESSEQUALS",
    NOTEQUALS = "NOTEQUALS",
    COMMA = "COMMA",
    PERIOD = "PERIOD",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",

    // Other
    FUNCTION = "FUNCTION",
}

export const SYMBOLS = [
    "+",
    "-",
    "*",
    "/",
    ">",
    "<",
    "=",
    ",",
    ".",
    ";",
    "(",
    ")",
    "{",
    "}",
    "!",
]

function keyword(check: string, fromArr: string[], startIndex: number) {
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

    for (let i = 0; i < charArr.length; i++) {
        const c = charArr[i]

        if (keyword("//", charArr, i)) {
            return []
        } else if (c == "+") {
            tokenArr.push(TokenType.PLUS)
        } else if (c == "-") {
            tokenArr.push(TokenType.MINUS)
        } else if (c == "*") {
            tokenArr.push(TokenType.ASTERISK)
        } else if (c == "/") {
            tokenArr.push(TokenType.SLASH)
        } else if (keyword("==", charArr, i)) {
            tokenArr.push(TokenType.DOUBLEEQUALS)
            i += 1
        } else if (keyword(">=", charArr, i)) {
            tokenArr.push(TokenType.GREATEREQUALS)
            i += 1
        } else if (keyword("<=", charArr, i)) {
            tokenArr.push(TokenType.LESSEQUALS)
            i += 1
        } else if (keyword("!=", charArr, i)) {
            tokenArr.push(TokenType.NOTEQUALS)
            i += 1
        } else if (c == "=") {
            tokenArr.push(TokenType.EQUALS)
        } else if (c == ">") {
            tokenArr.push(TokenType.GREATER)
        } else if (c == "<") {
            tokenArr.push(TokenType.LESS)
        } else if (c == "!") {
            tokenArr.push(TokenType.NOT)
        } else if (c == ",") {
            tokenArr.push(TokenType.COMMA)
        } else if (c == "(") {
            tokenArr.push(TokenType.LPAREN)
        } else if (c == ")") {
            tokenArr.push(TokenType.RPAREN)
        } else if (c == "{") {
            tokenArr.push(TokenType.OPEN)
        } else if (c == "}") {
            tokenArr.push(TokenType.CLOSE)
        } else if (c == ".") {
            tokenArr.push(TokenType.PERIOD)
        } else if (keyword("if", charArr, i)) {
            tokenArr.push(TokenType.IF)
            i += 1
        } else if (keyword("val", charArr, i)) {
            tokenArr.push(TokenType.VAL)
            i += 2
        } else if (keyword("func", charArr, i)) {
            tokenArr.push(TokenType.FUNC)
            i += 3
        } else if (keyword("return", charArr, i)) {
            tokenArr.push(TokenType.RETURN)
            i += 5
        } else {
            if (isNumeric(c)) {
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
                tokenArr.push(TokenType.NUMBER + ":" + number)
            } else if (c == "\"") {
                let string = "\""
                let j = i + 1
                
                for (j; j < charArr.length; j++) {
                    if (charArr[j] == "\"") {
                        string += "\""
                        break
                    }

                    string += charArr[j]
                }

                i += j - i
                tokenArr.push(TokenType.STRING + ":" + string)
            } else {
                if (c == " ") continue

                if (isAlpha(c)) {
                    let combined = ""
                    let j = i

                    for (j; j < charArr.length; j++) {
                        if (isAlpha(charArr[j])) {
                            combined += charArr[j]
                        } else {
                            break
                        }
                    }

                    i += j - i
                    tokenArr.push(TokenType.LITERAL + ":" + combined)
                }

                if (charArr[i] == " ") continue
                if (charArr[i] == undefined) continue
                if (SYMBOLS.includes(charArr[i])) {
                    i--
                    continue
                }

                tokenArr.push(TokenType.LITERAL + ":" + charArr[i])
            }
        }
    }

    return tokenArr
}