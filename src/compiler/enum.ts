export enum Token {
    // Keywords
    PUT = "PUT",
    PUTS = "PUTS",
    RET = "RET",
    PUSH = "PUSH",
    DUP = "DUP",
    SWAP = "SWAP",
    DROP = "DROP",
    OVER = "OVER",
    ROT = "ROT",
    EQUAL = "EQUAL",
    FUN = "FUN",
    DO = "DO",
    TUNL = "TUNL",
    END = "END",
    
    // Types
    IDENTIFIER = "IDENTIFIER",
    NUMBER = "NUMBER",
    FLOAT = "FLOAT",
    STRING = "STRING",
    TUNNEL = "TUNNEL",

    // Symbols
    PLUS = "PLUS",
    DPLUS = "DPLUS",
    MINUS = "MINUS",
    DMINUS = "DMINUS",
    ASTERISK = "ASTERISK",
    SLASH = "SLASH",
    COMMA = "COMMA",
    PERIOD = "PERIOD",
}