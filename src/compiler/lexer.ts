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
            } else if (word == "Newline") {
                word = "Newline"
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
                        if (words[k].endsWith("\"")) break
                    }

                    word = "String: " + newWordArr.join(" ")
                } else {
                    /*if (!stringIndexes.includes(j)) {
                        word = "Unkown: " + word
                    }*/

                    if (words[j - 1].includes(word[j])) {
                        console.log("si")
                    }
                }
            }
    
            tokenArray.push(word)
        }
    }

    console.log(tokenArray)
    return tokenArray
}