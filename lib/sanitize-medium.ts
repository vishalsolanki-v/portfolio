import 'server-only';
import createDOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

export function unwrapCdata(s = '') {
  const m = s.match(/^<!\[CDATA\[(.*)\]\]>$/s);
  if (m) return m[1];
  return s.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
}

import { decode } from 'html-entities';
export function decodeIfFullyEscaped(s = '') {
  if (s.includes('<')) return s;
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
  let html = unwrapCdata(rawHtml);
  html = decodeIfFullyEscaped(html);
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

  const dom = new JSDOM(`<body>${clean}</body>`);
  const doc = dom.window.document;

  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    const w = (img.getAttribute('width') || '').trim();
    const h = (img.getAttribute('height') || '').trim();
    if (src.includes('medium.com/_/stat') || (w === '1' && h === '1')) {
      img.remove();
      return;
    }
  });

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

  doc.querySelectorAll('p').forEach(p => { if (!p.textContent?.trim()) p.remove(); });

  return doc.body.innerHTML;
}
