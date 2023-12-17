/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

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

    console.log(tokensArr)

    for (let lineIndex = 0; lineIndex < tokensArr.length; lineIndex++) {
        const tokens = tokensArr[lineIndex]

        for (let i = 0; i < tokens.length; i += 1) {
            if (tokens[i] == TokenType.VAL) {
                if (i != 0) {
                    throw new SyntaxError("Variable declaration keyword(val) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || !tokens[i + 1].includes(TokenType.LITERAL)) {
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

                if (await checkForClose(lineIndex, tokensArr) == false) {
                    throw new SyntaxError("If statements require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (tokens[i] == TokenType.FUNC) {
                if (i != 0) {
                    throw new SyntaxError("Function declaration keyword(func) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || !tokens[i + 1].includes(TokenType.LITERAL)) {
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

                if (await checkForClose(lineIndex, tokensArr) == false) {
                    throw new SyntaxError("Functions require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (tokens[i].includes(TokenType.NUMBER)) {
                if (tokens[i].replace(".", "").includes(".")) {
                    throw new SyntaxError("Float contains multiple periods.", lines[lineIndex])
                }
            }
        }
    }

    return tokensArr
}