export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(href: string): string {
  if (!href) return href;
  if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return href;
  if (href.startsWith("#")) return href;
  return `${basePath}${href.startsWith("/") ? href : `/${href}`}`;
}
