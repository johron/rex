import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

export default function (line: string) {
    const tokens = lexer(line)

     for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == TokenType.VAL) {
            if (i != 0) {
                new SyntaxError("Variable declaration(val) placed incorrectly.")
            }

            if (tokens[i + 1] == undefined) {
                new SyntaxError("Variable declaration(val) must have a name.")
            }

            if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.EQUALS) {
                new SyntaxError("Variable declaration(val) missing equals(=) symbol.")
            }

            if (tokens[i + 3] == undefined || tokens[i + 3].includes(TokenType.LITERAL)) {
                new SyntaxError("Variable declaration(val) missing value.")
            }
        }
     }

    return tokens
}