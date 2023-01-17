export default function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  let out = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    out.push(arr.slice(i, Math.min(arr.length, i + chunkSize)));
  }
  return out;
}
