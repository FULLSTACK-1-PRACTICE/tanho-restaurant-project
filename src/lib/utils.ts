export function formatSum(n: number): string {
    return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' so‘m';
}