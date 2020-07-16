export function nameCase(s: string): string {
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function getFileName(f: string): string {
  const parts = f.split("/");
  if (parts) {
    const last = parts.pop();
    if (last) return last.split(".")[0];
  }
  return f.split(".")[0];
}
