// lib/medium-normalize.ts
import 'server-only';
import createDOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

export function unwrapCdata(s = '') {
  // If the *entire* string is one CDATA block, unwrap it
  const m = s.match(/^<!\[CDATA\[(.*)\]\]>$/s);
  if (m) return m[1];
  // Otherwise strip stray markers
  return s.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
}

// Only decode when the *whole* string is HTML-escaped (not just code blocks)
import { decode } from 'html-entities';
export function decodeIfFullyEscaped(s = '') {
  // If there are any real '<' tags, do NOT decode
  if (s.includes('<')) return s;
  // If it looks escaped at top-level, decode once
  if (/^(&lt;|&amp;|&quot;|&#)/i.test(s)) return decode(s);
  return s;
}

export function normalizeTitle(raw = '') {
  return unwrapCdata(raw).replace(/\s+/g, ' ').trim();
}

const ALLOWED_IFRAME_HOSTS = new Set([
  'www.youtube.com','youtube.com','player.vimeo.com',
  'open.spotify.com','w.soundcloud.com',
  'codesandbox.io','codepen.io','jsfiddle.net',
  'www.figma.com','figma.com','giphy.com'
]);

export function sanitizeAndNormalizeMediumHtml(rawHtml: string) {
  // 1) unwrap CDATA (and decode only if the whole thing is escaped)
  let html = unwrapCdata(rawHtml);
  html = decodeIfFullyEscaped(html);

  // 2) sanitize with JSDOM + DOMPurify (SSR-safe)
  const window = new JSDOM('').window as unknown as Window;
  const DOMPurify = createDOMPurify(window as any);

  const clean = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['figure','figcaption','iframe'],
    ADD_ATTR: [
      'allow','allowfullscreen','frameborder','scrolling',
      'loading','decoding','referrerpolicy','target','rel','srcset','sizes'
    ],
    FORBID_ATTR: ['style','onerror','onclick','onload'],
    FORBID_TAGS: ['script','style','form','input','button'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    KEEP_CONTENT: false,
  });

  // 3) post-process DOM: allowlist iframes, wrap responsive, normalize images, drop trackers
  const dom = new JSDOM(`<body>${clean}</body>`);
  const doc = dom.window.document;

  // a) kill Medium tracking pixel(s)
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    const w = (img.getAttribute('width') || '').trim();
    const h = (img.getAttribute('height') || '').trim();
    if (src.includes('medium.com/_/stat') || (w === '1' && h === '1')) {
      img.remove();
      return;
    }
  });

  // b) images: lazy + figure wrap
  doc.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading','lazy');
    img.setAttribute('decoding','async');
    img.removeAttribute('width');
    img.removeAttribute('height');
    if (!img.closest('figure')) {
      const fig = doc.createElement('figure');
      img.replaceWith(fig);
      fig.appendChild(img);
    }
  });

  // c) iframes: allowlist + responsive wrapper
  doc.querySelectorAll('iframe').forEach(iframe => {
    try {
      const src = iframe.getAttribute('src') || '';
      const host = new URL(src, 'https://example.com').host;
      if (!ALLOWED_IFRAME_HOSTS.has(host)) {
        iframe.remove();
        return;
      }
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      iframe.setAttribute('allowfullscreen', 'true');
      if (!iframe.parentElement?.classList.contains('embed')) {
        const wrap = doc.createElement('div');
        wrap.className = 'embed';
        iframe.replaceWith(wrap);
        wrap.appendChild(iframe);
      }
    } catch { iframe.remove(); }
  });

  // d) remove empty paragraphs
  doc.querySelectorAll('p').forEach(p => { if (!p.textContent?.trim()) p.remove(); });

  return doc.body.innerHTML;
}
