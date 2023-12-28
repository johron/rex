/*
 * This file is a component of the Vex programming language (https://github.com/johanrong/vex/).
 * Copyright (c) 2023 Johan Rong and contributors.
 *
 * This source code is governed by the terms of the GNU General Public
 * License, version 3. If a copy of the GPL was not included with this
 * file, you can obtain one at: https://www.gnu.org/licenses/gpl-3.0.txt
 */

import parser from "./parser"
import getValue from "../util/getValue.ts";
import getKey from "../util/getKey.ts";
import Instruction from "../enum/Instruction.ts";
import Symbol from "../enum/Symbol.ts";

export default async function (source: string) {
    const lines = await parser(source)

    let result = "section .text\n"
    result += "global _start\n"
    result += "echo:\n"
    result += "mov r9, -3689348814741910323\n"
    result += "sub rsp, 40\n"
    result += "mov BYTE [rsp+31], 10\n"
    result += "lea rcx, [rsp+30]\n"
    result += ".L2:\n"
    result += "mov rax, rdi\n"
    result += "lea r8, [rsp+32]\n"
    result += "mul r9\n"
    result += "mov rax, rdi\n"
    result += "sub r8, rcx\n"
    result += "shr rdx, 3\n"
    result += "lea rsi, [rdx+rdx*4]\n"
    result += "add rsi, rsi\n"
    result += "sub rax, rsi\n"
    result += "add eax, 48\n"
    result += "mov BYTE [rcx], al\n"
    result += "mov rax, rdi\n"
    result += "mov rdi, rdx\n"
    result += "mov rdx, rcx\n"
    result += "sub rcx, 1\n"
    result += "cmp rax, 9\n"
    result += "ja .L2\n"
    result += "lea rax, [rsp+32]\n"
    result += "mov edi, 1\n"
    result += "sub rdx, rax\n"
    result += "xor eax, eax\n"
    result += "lea rsi, [rsp+32+rdx]\n"
    result += "mov rdx, r8\n"
    result += "mov rax, 1\n"
    result += "syscall\n"
    result += "add rsp, 40\n"
    result += "ret\n"
    
    for (let line = 0; line < lines.length; line++) {
        if (lines[line].length == 0) continue
        
        for (let token = 0; token < lines[line].length; token++) {
            if (lines[line][token] == "") continue
            
            const currentToken: string = lines[line][token]
            
            if (currentToken == Instruction.ADD) {
                result += `;; -- add --\n`
                result += "pop rbx\n"
                result += "pop rax\n"
                result += "add rax, rbx\n"
                result += "push rax\n"
            } else if (currentToken == Instruction.SUB) {
                result += `;; -- sub --\n`
                result += "pop rax\n"
                result += "pop rbx\n"
                result += "sub rbx, rax\n"
                result += "push rbx\n"
            } else if (currentToken == Instruction.MUL) {
                result += `;; -- mul --\n`
                result += "pop rbx\n"
                result += "pop rax\n"
                result += "mul rbx\n"
                result += "push rax\n"
            } else if (currentToken == Instruction.DIV) {
                result += `;; -- div --\n`
                result += "pop rbx\n"
                result += "pop rax\n"
                result += "div rbx\n"
                result += "push rax\n"
            } else if (currentToken == Instruction.RUN) {
                const tokenArgument: string = lines[line][token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
                
                result += `;; -- call ${tokenArgument} --\n`
                result += `call ${tokenArgument}\n`
                
                token++
            } else if (currentToken == Instruction.RET) {
                result += `;; -- ret --\n`
                result += ";; -- Not implemented --\n"
            } else if (currentToken == Instruction.PUSH) {
                const tokenArgument: string = lines[line][token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
                
                result += `;; -- push ${tokenArgument} --\n`
                result += `push ${tokenArgument}\n`
                
                token++
            } else if (currentToken == Instruction.ECHO) {
                result += `;; -- echo --\n`
                result += "pop rdi\n"
                result += "call echo\n"
            /*} else if (currentToken == Instruction.SECTION) {
                const tokenArgument: string = lines[line][token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]

                result += `;; -- section ${tokenArgument} --\n`
                result += `section .${tokenArgument}\n`

                token++*/
            } else if (currentToken == Symbol.ARROW) {
                const tokenArgument: string = lines[line][token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
                
                result += `;; -- ${tokenArgument} --\n`
                if (tokenArgument == "start") result += "_"
                
                result += `${tokenArgument}:\n`
                
                token++
            } else {
                console.log("Unknown token found during code generation: " + currentToken)
            }
        }
    }
    
    result += "mov rax, 60\n"
    result += "xor rdi, rdi\n"
    result += "syscall\n"
    
    return result
}