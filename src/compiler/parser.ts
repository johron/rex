import lexer from "./lexer";
import { Token } from './enum.ts'
import getFirst from "../util/getFirst.ts";
import getMiddle from "../util/getMiddle.ts";
import getLast from "../util/getLast.ts";

export default async function (source: string) {
    let tokenArr = lexer(source)
    let newTokenArr: string[] = []
    
    for (let token = 0; token < tokenArr.length; token++) {
        if (tokenArr[token] == "") continue
        
        if (getFirst(tokenArr[token]) == Token.FLOAT) {
            if (tokenArr[token].replace(".", "").includes(".")) {
                console.error("rex: error: float contains multiple periods: " + tokenArr[token])
                process.exit(1)
            }
        } else if (tokenArr[token] == Token.EMIT) {
            if (getFirst(tokenArr[token - 1]) != Token.STRING) {
                console.error("rex: error: puta requires string before it")
                process.exit(1)
            }

            const string = getLast(tokenArr[token - 1])
            newTokenArr.push(Token.EMIT + ":" + string)
        } else if (getFirst(tokenArr[token]) == Token.NUMBER) {
            // implement other checks
            // if those checks fail then
            newTokenArr.push(Token.PUSH + ":" + tokenArr[token])
        } else if (getFirst(tokenArr[token]) == Token.STRING) {
            if (tokenArr[token + 1] == Token.EMIT) {
                tokenArr[token] = Token.EMIT + ":" + tokenArr[token]
                tokenArr[token + 1] = ""

                token --
                continue
            }
            
            newTokenArr.push(Token.PUSH + ":" + tokenArr[token])
        } else if (tokenArr[token] == Token.FUN) {
            if (getFirst(tokenArr[token + 1]) != Token.IDENTIFIER) {
                console.error("rex: error: fun requires identifier after it")
                process.exit(1)
            }
            
            newTokenArr.push(Token.FUN + ":" + tokenArr[token + 1])
            token++
        } else {
            newTokenArr.push(tokenArr[token])
        }
    }
    
    console.log(newTokenArr)
    return newTokenArr
}