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
    SEMICOLON = "SEMICOLON",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",
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
    "!",
]

export default function (line: string) {
    const charArr: string[] = line.split("")
    let tokenArr: string[] = []

    for (let i = 0; i < charArr.length; i++) {
        const c = charArr[i]

        if (c == "/" && charArr[i + 1] == "/") {
            return []
        } else if (c == "+") {
            tokenArr.push(TokenType.PLUS)
        } else if (c == "-") {
            tokenArr.push(TokenType.MINUS)
        } else if (c == "*") {
            tokenArr.push(TokenType.ASTERISK)
        } else if (c == "/") {
            tokenArr.push(TokenType.SLASH)
        } else if (c == "=" && charArr[i + 1] == "=") {
            tokenArr.push(TokenType.DOUBLEEQUALS)
            i += 1
        } else if (c == ">" && charArr[i + 1] == "=") {
            tokenArr.push(TokenType.GREATEREQUALS)
            i += 1
        } else if (c == "<" && charArr[i + 1] == "=") {
            tokenArr.push(TokenType.LESSEQUALS)
            i += 1
        } else if (c == "!" && charArr[i + 1] == "=") {
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
        } else if (c == ".") {
            tokenArr.push(TokenType.PERIOD)
        } else if (c == "i" && charArr[i+1] == "f") {
            tokenArr.push(TokenType.IF)
            i += 1
        } else if (c == "v" && charArr[i+1] == "a" && charArr[i+2] == "l") {
            tokenArr.push(TokenType.VAL)
            i += 2
        } else if (c == "f" && charArr[i+1] == "u" && charArr[i+2] == "n" && charArr[i+3] == "c") {
            tokenArr.push(TokenType.FUNC)
            i += 3
        } else if (c == "o" && charArr[i+1] == "p" && charArr[i+2] == "e" && charArr[i+3] == "n") {
            tokenArr.push(TokenType.OPEN)
            i += 3
        } else if (c == "c" && charArr[i+1] == "l" && charArr[i+2] == "o" && charArr[i+3] == "s" && charArr[i+4] == "e") {
            tokenArr.push(TokenType.CLOSE)
            i += 4
        } else if (c == "r" && charArr[i+1] == "e" && charArr[i+2] == "t" && charArr[i+3] == "u" && charArr[i+4] == "r" && charArr[i+5] == "n") {
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