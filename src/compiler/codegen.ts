export default function (tokens: string[], filePath: string) {
    // should return true/false for if the codegen was successfull.

    filePath += ".js"

    let result: string[] = []

    //console.log(tokens)

    //result += "#include <stdio.h>\n"
    //result += "int main(int argc, char* argv[]) {\n"

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        //console.log(token)

        let [type, ...rest] = token.split(': ')

        let value = rest.join(": ")

        console.log(type, value)

        if (type == "DeclarationOperator") {
            result.push("let")
        } else if (type == "DeclarationName") {
            result.push(value)
        } else if (type == "EqualsOperator") {
            result.push("=")
        } else if (type == "AdditionOperator") {
            result.push("+")
        } else if (type == "SubtractionOperator") {
            result.push("-")
        } else if (type == "MultiplicationOperator") {
            result.push("*")
        } else if (type == "DivisionOperator") {
            result.push("/")
        } else if (type == "CallOperator") {
            result.push("/*unfinished CallOperator*/")
        } else if (type == "Newline") {
            result.push("\n")
        } else if (type == "PrintFunction") {
            result.push("/*unfinished PrintFunction*/")
        } else {
            if (type == "Number") {
                result.push(value)
            } else if (type == "Float") {
                result.push(value)
            } else if (type == "String") {
                result.push(value)
            } else if (type == "Variable") {
                result.push(value)
            } else {
                result.push(`/*Unknown ${type} ${value}`)
            }
        }
    }

    //result.push("}")
    let code = result.join(" ").replaceAll("\n ", "\n")
    Bun.write(filePath, code)
    //console.log(result)
    return true
}