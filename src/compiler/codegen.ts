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
    const lines = await parser(source)

    let result = ""

    for (let line = 0; line < lines.length; line++) {
        for (let token = 0; token < lines[line].length; token++) {
            if (token != 0) {
                result += " "
            }

            const currentToken = lines[line][token]

            if (currentToken == TokenType.VAL) {
                result += 'let'
            } else if (currentToken == TokenType.FUNC) {
                result += "function"
            } else if (currentToken == TokenType.IF) {
                result += 'if'
            } else if (currentToken == TokenType.RETURN) {
                result += 'return'
            } else if (currentToken == TokenType.OPEN) {
                result += "{"
            } else if (currentToken == TokenType.CLOSE) {
                result += "}"
            } else if (currentToken == TokenType.PERIOD) {
                result += "."
            } else if (currentToken == TokenType.COMMA) {
                result += ","
            } else if (currentToken == TokenType.LPAREN) {
                result += "("
            } else if (currentToken == TokenType.RPAREN) {
                result += ")"
            } else if (currentToken == TokenType.NOT) {
                result += "!"
            } else if (currentToken == TokenType.PLUS) {
                result += '+'
            } else if (currentToken == TokenType.MINUS) {
                result += '-'
            } else if (currentToken == TokenType.ASTERISK) {
                result += '*'
            } else if (currentToken == TokenType.SLASH) {
                result += '/'
            } else if (currentToken == TokenType.GREATER) {
                result += '>'
            } else if (currentToken == TokenType.LESS) {
                result += '<'
            } else if (currentToken == TokenType.EQUALS) {
                result += '='
            } else if (currentToken == TokenType.GREATEREQUALS) {
                result += '>='
            } else if (currentToken == TokenType.LESSEQUALS) {
                result += '<='
            } else if (currentToken == TokenType.NOTEQUALS) {
                result += '!='
            } else if (currentToken == TokenType.DOUBLEEQUALS) {
                result += '=='
            } else if (currentToken.includes(TokenType.STRING)) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (currentToken.includes(TokenType.NUMBER)) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (currentToken.includes(TokenType.LITERAL)) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else {
                console.log("Unknown token found during code generation: " + currentToken)
            }
        }

        result += "\n"
    }

    result += "main()"
    Bun.write("build/test.js", result)
}