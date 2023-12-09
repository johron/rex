import SyntaxError from "../error/SyntaxError";
import lexer, { TokenType } from "./lexer";

export default function (line: string) {
    const tokens = lexer(line)
    console.log(tokens)

     for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] == TokenType.VAL) {
            if (i != 0) {
                new SyntaxError("Variable declaration(val) placed incorrectly.", line)
            }

            if (tokens[i + 1] == undefined) {
                new SyntaxError("Variable declaration(val) must have a name.", line)
            }

            if (tokens[i + 2] == undefined || tokens[i + 2] != TokenType.EQUALS) {
                new SyntaxError("Variable declaration(val) missing equals(=) symbol.", line)
            }

            if (tokens[i + 3] == undefined || tokens[i + 3].includes(TokenType.LITERAL)) {
                new SyntaxError("Variable declaration(val) missing value.", line)
            }
        }
     }

    return tokens
}