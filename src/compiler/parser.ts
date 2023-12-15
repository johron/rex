import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

async function checkForClose(lineIndex: number, tokensArr: string[][]) {
    for (let k = lineIndex; k < tokensArr.length; k++) {
        if (tokensArr[k].includes("CLOSE")) {
            return true
        }
    }

    return false;
}

async function getTokensArr(lines: string[]) {
    let ret: string[][] = []

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        ret.push(lexer(lines[lineIndex]))
    }

    return ret
}

export default async function (source: string) {
    source = source.replaceAll(/[\r\n]+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');
    let lines = source.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    //console.log(lines)
    const tokensArr: string[][] = await getTokensArr(lines)
    console.log(tokensArr)

    for (let lineIndex = 0; lineIndex < tokensArr.length; lineIndex++) {
        const tokens = tokensArr[lineIndex]
        //console.log(lineIndex, tokensArr.length)
        

        for (let i = 0; i < tokens.length; i += 1) {
            if (tokens[i] == TokenType.VAL) {
                if (i != 0) {
                    new SyntaxError("Variable declaration keyword(val) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || !tokens[i + 1].includes(TokenType.LITERAL)) {
                    new SyntaxError("Variable declaration keyword(val) must have a name.", lines[lineIndex])
                }

                if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.EQUALS) {
                    new SyntaxError("Variable declaration keyword(val) missing equals(=) symbol.", lines[lineIndex])
                }

                if (tokens[i + 3] == undefined) {
                    new SyntaxError("Variable declaration keyword(val) missing value.", lines[lineIndex])
                }
            } else if (tokens[i] == TokenType.IF) {
                if (i != 0) {
                    new SyntaxError("If keyword(if) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || tokens[i + 1] != TokenType.LPAREN) {
                    new SyntaxError("If keyword(if) requires a left parenthesis.", lines[lineIndex])
                }

                if (tokens[tokens.length - 2] != TokenType.RPAREN) { // -2 because lists start at 0
                    new SyntaxError("If keyword(if) requires a right parenthesis after condition.", lines[lineIndex])
                }

                if (tokens[tokens.length - 1] != TokenType.OPEN) { // -1 because lists start at 0
                    new SyntaxError("If statement(if) requires an open keyword.", lines[lineIndex])
                }

                if (await checkForClose(lineIndex, tokensArr) == false) {
                    new SyntaxError("If statements require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (tokens[i] == TokenType.FUNC) {
                if (i != 0) {
                    new SyntaxError("Function declaration keyword(func) placed incorrectly.", lines[lineIndex])
                }

                if (tokens[i + 1] == undefined || !tokens[i + 1].includes(TokenType.LITERAL)) {
                    new SyntaxError("Function declaration keyword(func) must have a name.", lines[lineIndex])
                }

                if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.LPAREN) {
                    new SyntaxError("Function declaration keyword(func) requires a left parenthesis.", lines[lineIndex])
                }

                if (tokens[tokens.length - 2] != TokenType.RPAREN) { // -2 because lists start at 0
                    new SyntaxError("Function declaration keyword(func) requires a right parenthesis after arguments.", lines[lineIndex])
                }

                if (tokens[tokens.length - 1] != TokenType.OPEN) { // -1 because lists start at 0
                    new SyntaxError("Function declaration keyword(func) requires an open keyword.", lines[lineIndex])
                }

                let k = i
                let broke = false
                for (k; tokens.length; k++) {
                    if (tokens[k] == TokenType.CLOSE) {
                        broke = true
                    }
                }

                if (broke != true) {
                    new SyntaxError("Functions require a close keyword after function contents.", lines[lineIndex])
                }
            } else if (tokens[i].includes(TokenType.NUMBER)) {
                if (tokens[i].replace(".", "").includes(".")) {
                    new SyntaxError("Float contains multiple periods.", lines[lineIndex])
                }
            }
        }

        tokensArr.push(tokens)
    }

    return tokensArr
}