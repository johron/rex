import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

export default function (line: string) {
    const tokens = lexer(line)

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == TokenType.VAL) {
            if (i != 0) {
                new SyntaxError("Variable declaration keyword(val) placed incorrectly.", line)
            }

            if (tokens[i + 1] == undefined || tokens[i + 1] != TokenType.LITERAL) {
                new SyntaxError("Variable declaration keyword(val) must have a name.", line)
            }

            if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.EQUALS) {
                new SyntaxError("Variable declaration keyword(val) missing equals(=) symbol.", line)
            }

            if (tokens[i + 3] == undefined) {
                new SyntaxError("Variable declaration keyword(val) missing value.", line)
            }
        } else if (tokens[i] == TokenType.IF) {
            if (i != 0) {
                new SyntaxError("If keyword(if) placed incorrectly.", line)
            }

            if (tokens[i + 1] == undefined || tokens[i + 1] != TokenType.LPAREN) {
                new SyntaxError("If keyword(if) requires a left parenthesis.", line)
            }

            if (tokens[tokens.length - 2] != TokenType.RPAREN) { // -2 because lists start at 0
                new SyntaxError("If keyword(if) requires a right parenthesis after condition.", line)
            }

            if (tokens[tokens.length - 1] != TokenType.OPEN) { // -1 because lists start at 0
                new SyntaxError("If keyword(if) requires an open keyword.", line)
            }
        } else if (tokens[i].includes(TokenType.NUMBER)) {
            if (tokens[i].replace(".", "").includes(".")) {
                new SyntaxError("Float contains multiple periods.", line)
            }
        }
     }

    return tokens
}