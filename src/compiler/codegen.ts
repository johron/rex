import parser from "./parser"

export default function (source: string) {
    const tokens = parser(source)
}