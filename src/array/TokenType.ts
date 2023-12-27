export enum TokenType {
    // Copying Data
    MOV = "MOV",
    
    // Arithmetic
    ADD = "ADD",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV",
    
    // Function calls
    CALL = "CALL",
    RET = "RET",
    PUSH = "PUSH",
    POP = "POP",
    
    // Standard function calls
    // ECHO = "ECHO",
    // READ = "READ",

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
    COMMA = "COMMA",
    PERIOD = "PERIOD",
    LBRACKET = "LBRACKET",
    RBRACKET = "RBRACKET",
}

export default TokenType