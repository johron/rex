export default class {
    constructor (message: string, line: string) {
        line = JSON.stringify(line)
        line = line.substring(1, line.length - 1)

        console.log(line)
        console.log("SyntaxError: " + message)
        process.exit(1)
    }
}