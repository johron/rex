import codegen from "../compiler/codegen";

export default async function(args: string[]) {
    const path = args[1]
    const file = Bun.file(path)

    if (!await file.exists()) {
        console.error("file not found")
        process.exit(1)
    }

    codegen(await file.text())
}