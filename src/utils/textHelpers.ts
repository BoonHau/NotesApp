export function truncateText(text: string, maxLenght: number): string {
  if (text.length > maxLenght) {
    return text.slice(0, maxLenght) + '...';
  }
  return text;
}
