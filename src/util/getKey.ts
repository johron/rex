export default function (string: string) {
    return string.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)[0]
}