/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

enum Instruction {
    ADD = "ADD",
    SUB = "SUB",
    MUL = "MUL",
    DIV = "DIV",
    INC = "INC",
    DEC = "DEC",
    ECHO = "ECHO",
    PUTS = "PUTS",
    RET = "RET",
    PUSH = "PUSH",
    DUP = "DUP",
    EQUAL = "EQUAL",
    FUN = "FUN",
    DO = "DO",
    END = "END",
    EXIT = "EXIT",
}

export default Instruction