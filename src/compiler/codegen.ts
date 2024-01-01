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
import Type from "../enum/Type.ts";

export default async function (source: string) {
    let strings: string[] = []
    const tokens: string[] = await parser(source)

    let result = "BITS 64\n"
    result += "section .text\n"
    result += ";; -- put --\n"
    result += "put:\n"
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
    result += "global _start\n"
    
    for (let token = 0; token < tokens.length; token++) {
        if (tokens[token] == "") continue
        
        const currentToken: string = tokens[token]
        
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
        } else if (currentToken == Instruction.INC) {
            result += `;; -- inc --\n`
            result += "pop rax\n"
            result += "inc rax\n"
            result += "push rax\n"
        } else if (currentToken == Instruction.DEC) {
            result += `;; -- dec --\n`
            result += "pop rax\n"
            result += "dec rax\n"
            result += "push rax\n"
        } else if (currentToken == Instruction.PUT) {
            result += `;; -- put --\n`
            result += "pop rdi\n"
            result += "call put\n"
        } else if (currentToken == Instruction.PUTS) {
            result += `;; -- puts --\n`
            result += "mov rax, 1\n"
            result += "mov rdi, 1\n"
            result += "pop rsi\n"
            result += "pop rdx\n"
            result += "syscall\n"
            result += "push rax\n"
        } else if (currentToken == Instruction.RET) {
            result += `;; -- ret --\n`
            result += ";; -- Not implemented --\n"
        } else if (currentToken == Instruction.PUSH) {
            const tokenArgument: string = tokens[token + 1]
            result += `;; -- push ${getValue(tokenArgument)} --\n`
            
            if (getKey(tokenArgument) == Type.STRING) {
                result += `mov rax, ${getValue(tokenArgument).length + 1}\n`
                result += `push rax\n`
                result += `push str_${strings.length}\n`
                strings.push(getValue(tokenArgument))
            } else {
                result += `mov rax, ${getValue(tokenArgument)}\n`
                result += `push rax\n`
            }
            
            token++
        } else if (currentToken == Instruction.EQUAL) {
            result += ";; -- equal --\n"
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "cmp rax, rbx\n"
            result += "sete al\n"
            result += "push rax\n"
        } else if (currentToken == Instruction.DUP) {
            result += ";; -- dup --\n"
            result += "pop rax\n"
            result += "push rax\n"
            result += "push rax\n"
        } else if (currentToken == Instruction.FUN) {
            const tokenArgument: string = tokens[token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            result += `;; -- ${tokenArgument} --\n`
            if (tokenArgument == "main") result += "_start:\n"
            else result += `${tokenArgument}:\n`
            token++
        } else if (currentToken == Instruction.EXIT) {
            result += ";; -- exit --\n"
            result += "mov rax, 60\n"
            result += "xor rdi, rdi\n"
            result += "syscall\n"
        } else {
            console.log("unknown token found during code generation: " + currentToken)
            process.exit(1)
        }
    }
    
    result += "section .data\n"
    for (let string = 0; string < strings.length; string++) {
        const byteArray: number[] = Array.from(Buffer.from(strings[string], 'utf-8'));
        let hexString: string = byteArray.map(num => "0x" + num.toString(16)).join(',');
        hexString = hexString.replaceAll("0x5c,0x6e", "0xA")
        result += `str_${string}: db ${hexString}\n`
    }
    
    return result
}