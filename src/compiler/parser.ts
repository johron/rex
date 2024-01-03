import lexer from "./lexer";
import getKey from "../util/getKey.ts";
import Type from "../enum/Type.ts";
import Instruction from "../enum/Instruction.ts";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    let openCount = 0

    for (let i = lineIndex; i < tokensArr.length; i++) {
        const tokens = tokensArr[i]

        for (let j = 0; j < tokens.length; j++) {
            if (tokens[j] === Instruction.DO) {
                openCount++
            } else if (tokens[j] === Instruction.END) {
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
        if (getKey(tokenArr[token]) == Type.FLOAT) {
            if (tokenArr[token].replace(".", "").includes(".")) {
                console.log("float contains multiple periods: " + tokenArr[token])
                process.exit(1)
            }
        } else if (tokenArr[token] == Instruction.DO || tokenArr[token] == Instruction.END) {
            tokenArr[token] = ""
        }
    }

    return tokenArr
}