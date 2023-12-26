/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import parser from "./parser"
import getValue from "../util/getValue.ts";
import getKey from "../util/getKey.ts";
import TokenType from "../array/TokenType.ts";

export default async function (source: string) {
    const lines = await parser(source)

    let result = ""

    for (let line = 0; line < lines.length; line++) {
        for (let token = 0; token < lines[line].length; token++) {
            const currentToken: string = lines[line][token]

            if (currentToken == TokenType.VAL) {
                const type: string = getValue(lines[line][token + 1])
                if (type == TokenType.INTEGER) {
                    result += "int "
                } else if (type == TokenType.FLOAT) {
                    result += "float "
                } else if (type == TokenType.STRING) {
                    result += "char* "
                } else if (type == TokenType.BOOLEAN) {
                    result += "bool "
                }
                
                token++
            } else if (currentToken == TokenType.FUNC) {
                const type: string = getValue(lines[line][token + 1])
                if (type == TokenType.INTEGER) {
                    result += "int "
                } else if (type == TokenType.FLOAT) {
                    result += "float "
                } else if (type == TokenType.STRING) {
                    result += "char* "
                } else if (type == TokenType.BOOLEAN) {
                    result += "bool "
                }

                token++
            } else if (currentToken == TokenType.IF) {1
                result += 'if'
            } else if (currentToken == TokenType.RETURN) {
                result += 'return '
            } else if (currentToken == TokenType.USE) {
                result += `#include ${getValue(lines[line][token + 1])}`
                token++
            } else if (getKey(currentToken) == TokenType.BOOLEAN) {
                result += getValue(currentToken)
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
            } else if (currentToken == TokenType.GEQUALS) {
                result += '>='
            } else if (currentToken == TokenType.LEQUALS) {
                result += '<='
            } else if (currentToken == TokenType.NEQUALS) {
                result += '!=='
            } else if (currentToken == TokenType.DEQUALS) {
                result += '==='
            } else if (getKey(currentToken) == TokenType.STRING) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (getKey(currentToken) == TokenType.INTEGER) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (getKey(currentToken) == TokenType.FLOAT) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (getKey(currentToken) == TokenType.LITERAL) {
                result += currentToken.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            } else if (getKey(currentToken) == TokenType.STDFUNC) {
                if (getValue(currentToken) == "put") {
                    result += "printf"
                } else if (getValue(currentToken) == "take") {
                    result += "scanf"
                }
            } else {
                console.log("Unknown token found during code generation: " + currentToken)
            }
        }

        result += ";\n"
    }
    
    return result
}