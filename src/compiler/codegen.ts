import parser from "./parser"
import getValue from "../util/getValue.ts";
import getKey from "../util/getKey.ts";
import { Token } from "./enum.ts"

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
        
        if (currentToken == Token.ADD) {
            result += `;; -- add --\n`
            result += "pop rbx\n"
            result += "pop rax\n"
            result += "add rax, rbx\n"
            result += "push rax\n"
        } else if (currentToken == Token.SUB) {
            result += `;; -- sub --\n`
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "sub rbx, rax\n"
            result += "push rbx\n"
        } else if (currentToken == Token.MUL) {
            result += `;; -- mul --\n`
            result += "pop rbx\n"
            result += "pop rax\n"
            result += "mul rbx\n"
            result += "push rax\n"
        } else if (currentToken == Token.DIV) {
            result += `;; -- div --\n`
            result += "pop rbx\n"
            result += "pop rax\n"
            result += "div rbx\n"
            result += "push rax\n"
        } else if (currentToken == Token.INC) {
            result += `;; -- inc --\n`
            result += "pop rax\n"
            result += "inc rax\n"
            result += "push rax\n"
        } else if (currentToken == Token.DEC) {
            result += `;; -- dec --\n`
            result += "pop rax\n"
            result += "dec rax\n"
            result += "push rax\n"
        } else if (currentToken == Token.PUT) {
            result += `;; -- put --\n`
            result += "pop rdi\n"
            result += "call put\n"
        } else if (currentToken == Token.PUTS) {
            result += `;; -- puts --\n`
            result += "mov rax, 1\n"
            result += "mov rdi, 1\n"
            result += "pop rsi\n"
            result += "pop rdx\n"
            result += "syscall\n"
            result += "push rax\n"
        } else if (currentToken == Token.PUSH) {
            const tokenArgument: string = tokens[token + 1]
            result += `;; -- push ${getValue(tokenArgument)} --\n`
            
            if (getKey(tokenArgument) == Token.STRING) {
                const newlines = getValue(tokenArgument).split("\\n").length - 1
                let toRemove = 0
                if (newlines > 0) toRemove = 1
                else toRemove = 0
                result += `mov rax, ${getValue(tokenArgument).length - toRemove}\n`
                result += `push rax\n`
                result += `push str_${strings.length}\n`
                strings.push(getValue(tokenArgument))
            } else {
                result += `mov rax, ${getValue(tokenArgument)}\n`
                result += `push rax\n`
            }
            
            token++
        } else if (currentToken == Token.EQUAL) {
            result += ";; -- equal --\n"
            result += "mov rcx, 0\n"
            result += "mov rdx, 1\n"
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "cmp rax, rbx\n"
            result += "cmove rcx, rdx\n"
            result += "push rcx\n"
        } else if (currentToken == Token.DUP) {
            result += ";; -- dup --\n"
            result += "pop rax\n"
            result += "push rax\n"
            result += "push rax\n"
        } else if (currentToken == Token.SWAP) {
            result += ";; -- swap --\n"
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "push rax\n"
            result += "push rbx\n"
        } else if (currentToken == Token.DROP) {
            result += ";; -- drop --\n"
            result += "pop rax\n"
        } else if (currentToken == Token.OVER) {
            result += ";; -- over --\n"
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "push rbx\n"
            result += "push rax\n"
            result += "push rbx\n"
        } else if (currentToken == Token.ROT) {
            result += ";; -- rot --\n"
            result += "pop rax\n"
            result += "pop rbx\n"
            result += "pop rcx\n"
            result += "push rbx\n"
            result += "push rax\n"
            result += "push rcx\n"
        } else if (currentToken == Token.FUN) {
            const tokenArgument: string = tokens[token + 1].split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[1]
            result += `;; -- ${tokenArgument} --\n`
            if (tokenArgument == "main") result += "_start:\n"
            else result += `${tokenArgument}:\n`
            token++
        } else if (getKey(currentToken) == Token.TUNNEL) {
            const assembly = getValue(currentToken)
            result += `;; -- tunnel --\n`
            result += assembly + "\n"
        } else {
            console.log("unknown token found during code generation: " + currentToken)
            process.exit(1)
        }
    }

    result += ";; -- exit --\n"
    result += "mov rax, 60\n"
    result += "xor rdi, rdi\n"
    result += "syscall\n"
    
    result += "section .data\n"
    for (let string = 0; string < strings.length; string++) {
        const byteArray: number[] = Array.from(Buffer.from(strings[string], 'utf-8'));
        let hexString: string = byteArray.map(num => "0x" + num.toString(16)).join(',');
        hexString = hexString.replaceAll("0x5c,0x6e", "0xA")
        result += `str_${string}: db ${hexString}\n`
    }
    
    return result
}