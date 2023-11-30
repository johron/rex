export default function (tokens: string[], filePath: string) {
    // should return true/false for if the codegen was successfull.

    filePath += ".c"

    let result: string = ""

    console.log(tokens)

    result += "#include <stdio.h>\n"
    result += "int main(int argc, char* argv[]) {\n"

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]

        let [type, ...rest] = token.split(': ')

        let value = rest.join(": ")

        if (type == "DeclarationOperator") {
            let values = value.split(", ")
            if (values[0] == "Integer") {
                result += "int " + values[1]
            } else if (values[0] == "Float") {
                result += "float " + values[1]
            } else if (values[0] == "String") {
                result += "char* " + values[1]
            } else {
                console.error("Invalid declaration type: " + values[0])
                process.exit(1)
            }
        } else if (type == "EqualsOperator") {
            result += "="
        } else if (type == "AdditionOperator") {
            result += "+"
        } else if (type == "SubtractionOperator") {
            result += "-"
        } else if (type == "MultiplicationOperator") {
            result += "*"
        } else if (type == "DivisionOperator") {
            result += "/"
        } else if (type == "CallOperator") {
            result += "/*unfinished CallOperator*/"
        } else if (type == "Newline") {
            result += ";\n"
        } else if (type == "PrintFunction") {
            result += "printf"
        } else if (type == "Variable") {
            result += value
        } else {
            if (type == "Number") {
                result += value
            } else if (type == "Float") {
                result += value
            } else if (type == "String") {
                result += value
            } else {
                console.error("Unkown: " + type + ", " + value)
                process.exit(1)
            }
        }
    }

    result+= ";\n}"
    //let code = result.join(" ").replaceAll("\n ", "\n")
    Bun.write(filePath, result)
    return true
}