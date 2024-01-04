export default function (string: string) {
    const arr = string.split(/:(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    return arr[arr.length - 1]
}