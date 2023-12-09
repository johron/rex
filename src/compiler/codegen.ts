import parser from "./parser"

export default function (source: string) {
    source = source.replaceAll(/[\r\n]+(?=(?:(?:[^"]*"){2})*[^"]*$)/g, '');
    let sourceArr = source.split(/;(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    for (let i = 0; i < sourceArr.length; i++) {
        if (sourceArr[i].length == 0) continue
        const tokens = parser(sourceArr[i])
    }
}