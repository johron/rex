import parser from "./parser"

export default function (source: string) {
    let sourceArr = source.split(";") // This must be changed later because it will split ";" in strings

    for (let i = 0; i < sourceArr.length; i++) {
        if (sourceArr[i].length == 0) continue
        const tokens = parser(sourceArr[i])
        //console.log(tokens)
    }
}