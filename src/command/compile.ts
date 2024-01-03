import codegen from "../compiler/codegen";

export default async function(args: string[], assemble: boolean, link: boolean) {
    const source: string = args[0]
    const output: string = args[1]
    const file = Bun.file(source)

    if (!await file.exists()) {
        console.error("rex: error: invalid source path")
        console.log("compilation aborted")
        process.exit(1)
    }
    
    console.log("rex: info: stating")
    
    const result: string = await codegen(await file.text())
    await Bun.write(output, result)
    console.log("rex: info: wrote")
    
    if (assemble) {
        const proc = Bun.spawn(["nasm", "-felf64", output])
        await proc.exited
        console.log("rex: info: assembled")

        if (link) {
            const proc = Bun.spawn(["ld", "-o", output.split(".")[0], output.split(".")[0] + ".o"])
            await proc.exited
            console.log("rex: info: linked")
        }
    }
    
    console.log("rex: info: completed")
}