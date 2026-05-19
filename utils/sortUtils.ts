export function sortNames(names: string[], direction: 'asc' | 'desc'): string[] {
    return [...names].sort((a, b) => {
        return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
    });
}

export function sortPrices(prices: number[], direction: 'asc' | 'desc'): number[] {
  return [...prices].sort((a, b) => {
    return direction === 'asc' ? a - b : b - a;
  });
}