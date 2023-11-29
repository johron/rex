import isNumeric from "../util/isNumeric"

export default function (source: string) {
    source = source.replaceAll("\r", "")
    const lines = source.split("\n")

    let tokenArray: string[] = []

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let words = line.split(" ")
    
        for (let j = 0; j < words.length; j++) {
            let word = words[j]
    
            if (word == "new") {
                word = "DeclarationOperator"
            } else if (words.length > 1 && words[j - 1] == "new") {
                word = "DeclarationName: " + word
            } else if (word == "=") {
                word = "EqualsOperator"
            } else if (word == "+") {
                word = "AdditionOperator"
            } else if (word == "-") {
                word = "SubtractionOperator"
            } else if (word == "*") {
                word = "MultiplicationOperator"
            } else if (word == "/") {
                word = "DivisionOperator"
            } else if (word == "->") {
                word = "CallOperator"
            } else if (word == "print") {
                word = "PrintFunction"
            } else {
                if (isNumeric(word)) {
                    if (word.includes(".")) {
                        word = "Float: " + word
                    } else {
                        word = "Number: " + word
                    }
                } else if (word.startsWith("\"") && word.endsWith("\"")) {
                    word = "String: " + word
                } else if (word == "\n") {
                    word = "Newline"
                } else if (word.includes("\n")) {
                    words.push()
                } else {
                    word = "Unkown: " + word
                }
            }
    
            tokenArray.push(word)
        }
    }

    console.log(tokenArray)
    return tokenArray
}