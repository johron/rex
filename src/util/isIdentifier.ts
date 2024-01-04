export default function (source: string) {
    return /^[a-zA-Z0-9_]+$/.test(source)
}