import lexer from "./lexer";
import getKey from "../util/getKey.ts";
import { Token } from './enum.ts'

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

export default async function (source: string) {
    let tokenArr = lexer(source)

    for (let token = 0; token < tokenArr.length; token++) {
        if (getKey(tokenArr[token]) == Token.FLOAT) {
            if (tokenArr[token].replace(".", "").includes(".")) {
                console.log("float contains multiple periods: " + tokenArr[token])
                process.exit(1)
            }
        } else if (tokenArr[token] == Token.DO || tokenArr[token] == Token.END) {
            tokenArr[token] = ""
        }
    }

    return tokenArr
}