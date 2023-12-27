/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import SyntaxError from "../error/SyntaxError";
import TokenType from "../array/TokenType.ts";
import lexer from "./lexer";
import getKey from "../util/getKey.ts";
import StandardFunctions from "../array/StandardFunctions.ts";
import getValue from "../util/getValue.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === TokenType.OPEN) {
                openCount++
            } else if (tokens[j] === TokenType.CLOSE) {
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
    source = source.replaceAll(/[\r\n]+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '')
    let lines = source.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    let tokensArr: string[][] = []

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        tokensArr.push(lexer(lines[lineIndex]))
    }

    for (let lineIndex = 0; lineIndex < tokensArr.length; lineIndex++) {
        const tokens = tokensArr[lineIndex]

        if (tokens.length == 0) {
            tokensArr.splice(lineIndex, 1)
            lineIndex--
            continue
        }

        /*for (let i = 0; i < tokens.length; i++) { // This probably has to be written in another way as if the variable name has multiple keywords in the literal.
            if (tokens[i] == TokenType.VAL) {
                if (tokens[i + 1] == TokenType.VAL || tokens[i + 1] == TokenType.FUNC) {
                    if (tokens[i + 2].includes(TokenType.LITERAL)) {
                        const lastArr = tokens[i + 2].split(":")
                        const newLiteral = tokens[i + 1].toLocaleLowerCase() + lastArr[1]
                        tokens[i + 1] = TokenType.LITERAL + ":" + newLiteral
                        tokens[i + 2] = ""
                        console.log(tokens)
                    }
                }
            }
        }*/ // trying to check if there is a keyword followed by a litteral to check if the variable name contains a keyword. (val value = x) return: ["VAL", "VAL", "LITERAL:ue", "EQUALS", "LITERAL:x"]

        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] == TokenType.VAL) {
                if (i != 0) {
                    throw new SyntaxError("Variable declaration keyword(val) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || getKey(tokens[i + 1]) != TokenType.LITERAL) {
                    throw new SyntaxError("Variable declaration keyword(val) must have a name.", lines[lineIndex])
                }

                if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.EQUALS) {
                    throw new SyntaxError("Variable declaration keyword(val) missing equals(=) symbol.", lines[lineIndex])
                }

                if (tokens[i + 3] == undefined) {
                    throw new SyntaxError("Variable declaration keyword(val) missing value.", lines[lineIndex])
                }
            } else if (tokens[i] == TokenType.IF) {
                if (i != 0) {
                    throw new SyntaxError("If keyword(if) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || tokens[i + 1] != TokenType.LPAREN) {
                    throw new SyntaxError("If keyword(if) requires a left parenthesis.", lines[lineIndex])
                }

                if (tokens[tokens.length - 2] != TokenType.RPAREN) { // -2 because lists start at 0
                    throw new SyntaxError("If keyword(if) requires a right parenthesis after condition.", lines[lineIndex])
                }

                if (tokens[tokens.length - 1] != TokenType.OPEN) { // -1 because lists start at 0
                    throw new SyntaxError("If statement(if) requires an open keyword.", lines[lineIndex])
                }

                if (!await checkForClose(lineIndex, tokensArr)) {
                    throw new SyntaxError("If statements require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (tokens[i] == TokenType.FUNC) {
                if (i != 0) {
                    throw new SyntaxError("Function declaration keyword(func) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || getKey(tokens[i + 1]) != TokenType.LITERAL) {
                    throw new SyntaxError("Function declaration keyword(func) must have a name.", lines[lineIndex])
                }

                if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.LPAREN) {
                    throw new SyntaxError("Function declaration keyword(func) requires a left parenthesis.", lines[lineIndex])
                }

                if (tokens[tokens.length - 2] != TokenType.RPAREN) { // -2 because lists start at 0
                    throw new SyntaxError("Function declaration keyword(func) requires a right parenthesis after arguments.", lines[lineIndex])
                }

                if (tokens[tokens.length - 1] != TokenType.OPEN) { // -1 because lists start at 0
                    throw new SyntaxError("Function declaration keyword(func) requires an open keyword.", lines[lineIndex])
                }

                if (!await checkForClose(lineIndex, tokensArr)) {
                    throw new SyntaxError("Functions require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (getKey(tokens[i]) == TokenType.FLOAT) {
                if (tokens[i].replace(".", "").includes(".")) {
                    throw new SyntaxError("Float contains multiple periods.", lines[lineIndex])
                }
            } else if (getKey(tokens[i]) == TokenType.LITERAL) {
                if (StandardFunctions.includes(getValue(tokens[i]))) {
                    tokensArr[lineIndex][i] = TokenType.STDFUNC + ":" + getValue(tokens[i])
                }
            } else if (getKey(tokens[i]) == TokenType.STRING) {
                if (getValue(tokens[i]).includes("$")) {
                    let split = getValue(tokens[i]).split(" ")
    
                    for (let j = 0; j < split.length; j++) {
                        if (split[j].startsWith("$")) {
                            let name = split[j].replace("$", "")
                            let non_alpha = name.replace(/[a-zA-Z]/g, '');
                            let alphaOnly = name.replace(/[^a-zA-Z]/g, '');
                            split[j] = "${" + alphaOnly + "}" + non_alpha
                        }
                    }
    
                    tokensArr[lineIndex][i] = TokenType.LITERAL + ":" + split.join(" ")
                    console.log(tokensArr[lineIndex][i])
                }
            }
        }
    }

    console.log(tokensArr);
    
    return tokensArr
}