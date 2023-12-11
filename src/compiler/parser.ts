import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

export default function (source: string) {
    source = source.replaceAll(/[\r\n]+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');
    let lines = source.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    const tokensArr: string[][] = []

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const tokens = lexer(lines[lineIndex])

        for (let i = 0; i < tokens.length; i++) {
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

                let k = i
                let broke = false
                console.log(tokensArr)
                for (k; k < tokensArr.length; k++) {
                    console.log("y")
                    for (let kk = 0; kk < tokensArr[k].length; kk++) {
                        console.log(tokens[kk])
                        if (tokensArr[k][kk] == TokenType.CLOSE) {    
                            broke = true              
                            break
                        }
                    }
                }

                if (broke == false) {
                    new SyntaxError("If keyword(if) requires a close keyword.", lines[lineIndex])
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