import lexer from "./lexer";
import { Token } from './enum.ts'
import getFirst from "../util/getFirst.ts";
import getMiddle from "../util/getMiddle.ts";
import getLast from "../util/getLast.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === Token.DO) {
                openCount++
            } else if (tokens[j] === Token.END) {
                openCount--

                if (openCount === 0) {
                    return true
                }
            }
        }
    }

    return false
}

export let bindArray: string[] = []

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
        } else if (tokenArr[token] == Token.PUTA) {
            if (getFirst(tokenArr[token - 1]) != Token.STRING) {
                console.error("rex: error: puta requires string before it")
                process.exit(1)
            }

            const string = getLast(tokenArr[token - 1])
            newTokenArr.push(Token.PUTA + ":" + string)
        } else if (getFirst(tokenArr[token]) == Token.NUMBER) {
            // implement other checks
            // if those checks fail then
            newTokenArr.push(Token.PUSH + ":" + tokenArr[token])
        } else if (getFirst(tokenArr[token]) == Token.STRING) {
            if (tokenArr[token + 1] == Token.PUTA) {
                tokenArr[token] = Token.PUTA + ":" + tokenArr[token]
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
        /*} else if (tokenArr[token] == Token.KEYWORD_PEEK) {
            console.log(tokenArr)
            let hasDo = false
            let identifierCount = 0
            
            for (let i = token + 1; i < tokenArr.length; i++) {
                if (tokenArr[i] == Token.KEYWORD_DO) {
                    hasDo = true
                    break
                }

                if (i == token && getFirst(tokenArr[i]) != Token.TYPE_IDENTIFIER) {
                    console.error("rex: error: peek requires at least one identifier before it")
                    process.exit(1)
                }

                if (getFirst(tokenArr[i]) != Token.TYPE_IDENTIFIER) {
                    console.error("rex: error: only identifiers can be passed to peek")
                    process.exit(1)
                }

                bindArray.push(getLast(tokenArr[i]))

                identifierCount++
                tokenArr[i] = ""
            }

            if (!hasDo) {
                console.error("rex: error: peek requires do after identifier(s)")
                process.exit(1)
            }

            tokenArr[token] = Token.TYPE_BIND + `:${identifierCount}`*/
        /*} else if (getFirst(tokenArr[token]) == Token.TYPE_IDENTIFIER) {
            const identifier = getLast(tokenArr[token])
            if (bindArray.includes(identifier)) {
                tokenArr[token] = Token.KEYWORD_PUSH_BIND + ":" + Token.TYPE_IDENTIFIER + ":" + identifier
            }*/
        } else {
            newTokenArr.push(tokenArr[token])
        }
    }

    console.log("tokens from parser")
    console.log(newTokenArr)
    return newTokenArr
}