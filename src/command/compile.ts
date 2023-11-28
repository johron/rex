import codegen from "../compiler/codegen";
import lexer from "../compiler/lexer";

export default async function(args: string[]) {
    const path = args[1]
    const file = Bun.file(path)

    if (!await file.exists()) {
        console.error("badger: file not found")
        process.exit(1)
    }

    const source = file.text()
    const tokens = lexer(await source)
    const success = codegen(tokens, path.split(".")[0])
}