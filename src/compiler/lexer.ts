import isAlpha from "../util/isAlpha"
import isNumeric from "../util/isNumeric"
import {Token} from "./enum.ts";
import isIdentifier from "../util/isIdentifier.ts";

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
        
        if (has("puts", tokens, token)) {
            tokenArr.push(Token.PUTS)
            token += 3
        } else if (has("put", tokens, token)) {
            tokenArr.push(Token.PUT)
            token += 2
        } else if (has("swap", tokens, token)) {
            tokenArr.push(Token.SWAP)
            token += 3
        } else if (has("drop", tokens, token)) {
            tokenArr.push(Token.DROP)
            token += 3
        } else if (has("over", tokens, token)) {
            tokenArr.push(Token.OVER)
            token += 3
        } else if (has("rot", tokens, token)) {
            tokenArr.push(Token.ROT)
            token += 2
        } else if (has("fun", tokens, token)) {
            tokenArr.push(Token.FUN)
            token += 3
        } else if (has("do", tokens, token)) {
            tokenArr.push(Token.DO)
            token += 1
        } else if (has("end", tokens, token)) {
            tokenArr.push(Token.END)
            token += 2
        } else if (has("tunl", tokens, token)) {
            tokenArr.push(Token.TUNL)
            token += 3
        } else if (has(",", tokens, token)) {
            tokenArr.push(Token.COMMA)
        } else if (has(".", tokens, token)) {
            tokenArr.push(Token.PERIOD)
        } else if (has("=", tokens, token)) {
            tokenArr.push(Token.EQUAL)
        } else if (has("&", tokens, token)) {
            tokenArr.push(Token.DUP)
        } else if (has("++", tokens, token)) {
            tokenArr.push(Token.INC)
            token += 1
        } else if (has("--", tokens, token)) {
            tokenArr.push(Token.DEC)
            token += 1
        } else if (has("+", tokens, token)) {
            tokenArr.push(Token.ADD)
        } else if (has("-", tokens, token)) {
            tokenArr.push(Token.SUB)
        } else if (has("*", tokens, token)) {
            tokenArr.push(Token.MUL)
        } else if (has("/", tokens, token)) {
            tokenArr.push(Token.DIV)
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

            tokenArr.push(Token.PUSH)
            if (number.includes(".")) tokenArr.push(Token.FLOAT + ":" + number)
            else tokenArr.push(Token.NUMBER + ":" + number)
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
            tokenArr.push(Token.PUSH)
            tokenArr.push(Token.STRING + ":" + string)
        } else if (isIdentifier(c)) {
            let combined = ""
            let j = token

            for (j; j < tokens.length; j++) {
                if (isIdentifier(tokens[j])) {
                    combined += tokens[j]
                } else {
                    break
                }
            }

            token += j - token - 1
            tokenArr.push(Token.IDENTIFIER + ":" + combined)
        } else {
            console.log("unexpected token found during lexing: " + c)
            process.exit(1)
        }
    }

    return tokenArr
}