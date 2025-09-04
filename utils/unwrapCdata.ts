// utils/unwrapCdata.ts
export function unwrapCdata(s = "") {
  // if entire string is wrapped in one CDATA
  const m = s.match(/^<!\[CDATA\[(.*)\]\]>$/s);
  if (m) return m[1];
  // fallback: strip any stray markers
  return s.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
}
