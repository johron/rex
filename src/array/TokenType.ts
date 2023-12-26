export enum TokenType {
    // Keywords
    VAL = "VAL",
    FUNC = "FUNC",
    IF = "IF",
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    RETURN = "RETURN",
    USE = "USE",

    // Types
    TYPE = "TYPE",
    LITERAL = "LITERAL",
    STDFUNC = "STDFUNC",
    INTEGER = "INTEGER",
    FLOAT = "FLOAT",
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",

    // Symbols
    PLUS = "PLUS",
    MINUS = "MINUS",
    ASTERISK = "ASTERISK",
    SLASH = "SLASH",
    GREATER = "GREATER",
    LESS = "LESS",
    EQUALS = "EQUALS",
    NOT = "NOT",
    DEQUALS = "DEQUALS",
    GEQUALS = "GEQUALS",
    LEQUALS = "LEQUALS",
    NEQUALS = "NEQUALS",
    COMMA = "COMMA",
    PERIOD = "PERIOD",
    LPAREN = "LPAREN",
    RPAREN = "RPAREN",
}

export default TokenType