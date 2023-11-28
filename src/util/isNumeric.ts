export default function (value: any) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}