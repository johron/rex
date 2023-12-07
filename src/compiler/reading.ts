import isNumeric from "../util/isNumeric"

function insertStringBetweenElements(arr: string[], insertString: string) {
    let newArr: string[] = []
    
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i])

        if (i+1 < arr.length) {
            newArr.push(insertString)
        }
    }

    return newArr
}

export default function (source: string) {
    source = source.replaceAll("\r", "")
    let lines = insertStringBetweenElements(source.split("\n").filter(v=>v!=''), "Newline")

    let tokenArray: string[] = []

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]
        let words = line.split(" ")

        let stringIndexes: number[] = []
    
        for (let j = 0; j < words.length; j++) {
            let word = words[j]
    
            if (word == "new") {
                if (words.length >= 3) {
                    if (words[j + 1] == "int") {
                        word = "DeclarationOperator: Integer, " + words[j + 2]
                    } else if (words[j + 1] == "float") {
                        word = "DeclarationOperator: Float, " + words[j + 2]
                    } else if (words[j + 1] == "string") {
                        word = "DeclarationOperator: String, " + words[j + 2]
                    } else {
                        console.error("Missing declaration type and name")
                        process.exit(1)
                    }
                    j += 2
                } else {
                    console.error("Missing declaration type and name")
                    process.exit(1)
                }
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
            } else if (word == "Newline") {
                word = "Newline"
            } else if (word == "use") {
                if (words[j + 1]) word = "Variable: " + words[j + 1]
                j += 2
            } else {
                if (isNumeric(word)) {
                    if (word.includes(".")) {
                        word = "Float: " + word
                    } else {
                        word = "Number: " + word
                    }
                } else if (word.startsWith("\"") && word.endsWith("\"")) {
                    word = "String: " + word
                } else if (word.startsWith("\"")) {
                    let newWordArr: string[] = []

                    for (let k = j; k < words.length; k++) {
                        stringIndexes.push(k)
                        newWordArr.push(words[k])
                        if (words[k].endsWith("\"")) {
                            j += (k - j)
                            break
                        }
                    }

                    word = "String: " + newWordArr.join(" ")
                } else {
                    console.error("Unrecognized: " + word)
                    process.exit(1)
                }
            }
    
            tokenArray.push(word)
        }
    }

    return tokenArray
}