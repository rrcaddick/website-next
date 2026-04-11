export function buildEmailText(fields: Record<string, string>) {
  return Object.entries(fields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}
