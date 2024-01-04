import lexer from "./lexer";
import getKey from "../util/getKey.ts";
import { Token } from './enum.ts'
import getValue from "../util/getValue.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === Token.KEYWORD_DO) {
                openCount++
            } else if (tokens[j] === Token.KEYWORD_END) {
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
    let tokenArr = lexer(source)
    
    for (let token = 0; token < tokenArr.length; token++) {
        if (getKey(tokenArr[token]) == Token.TYPE_FLOAT) {
            if (tokenArr[token].replace(".", "").includes(".")) {
                console.error("rex: error: float contains multiple periods: " + tokenArr[token])
                process.exit(1)
            }
        } else if (tokenArr[token] == Token.KEYWORD_PEEK) {
            console.log(tokenArr)
            let hasDo = false
            let identifierCount = 0
            for (let i = token + 1; i < tokenArr.length; i++) {
                if (tokenArr[i] == Token.KEYWORD_DO) {
                    hasDo = true
                    break
                }
                
                if (i == token && getKey(tokenArr[i]) != Token.TYPE_IDENTIFIER) {
                    console.error("rex: error: peek requires at least one identifier before it")
                    process.exit(1)
                }
                
                if (getKey(tokenArr[i]) != Token.TYPE_IDENTIFIER) {
                    console.error("rex: error: only identifiers can be passed to peek")
                    process.exit(1)
                }
                
                identifierCount++
                //tokenArr[i] = ""
            }
            
            if (!hasDo) {
                console.error("rex: error: peek requires do after identifier(s)")
                process.exit(1)
            }
            
            tokenArr[token] = Token.TYPE_BIND + `:${identifierCount}`
        } else if (tokenArr[token] == Token.KEYWORD_PUTA) {
            if (getKey(tokenArr[token - 1]) != Token.TYPE_STRING) {
                console.error("rex: error: puta requires string before it")
                process.exit(1)
            }
            
            const string = getValue(tokenArr[token - 1])
            tokenArr[token] = ""
            tokenArr[token - 2] = ""
            tokenArr[token - 1] = Token.TYPE_PUTA + ":" + string
        }
    }

    console.log(tokenArr)
    return tokenArr
}