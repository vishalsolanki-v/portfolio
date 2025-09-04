// server-only sanitizer for Medium HTML
import 'server-only';
import createDOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

const ALLOWED_IFRAME_HOSTS = new Set([
  'www.youtube.com', 'youtube.com', 'player.vimeo.com',
  'open.spotify.com', 'w.soundcloud.com',
  'codesandbox.io', 'codepen.io', 'jsfiddle.net',
  'www.figma.com', 'figma.com', 'giphy.com'
]);

export function sanitizeAndNormalizeMediumHtml(rawHtml: string): string {
  // 1) DOMPurify with JSDOM (works during SSR)
  const window = new JSDOM('').window as unknown as Window;
  const DOMPurify = createDOMPurify(window as any);

  const clean = DOMPurify.sanitize(rawHtml, {
    // solid baseline
    USE_PROFILES: { html: true },
    // keep these tags Medium often uses
    ADD_TAGS: ['figure', 'figcaption', 'iframe'],
    // keep safe attrs for embeds & images
    ADD_ATTR: [
      'allow', 'allowfullscreen', 'frameborder', 'scrolling',
      'loading', 'decoding', 'referrerpolicy', 'target', 'rel'
    ],
    // reduce CSS fights
    FORBID_ATTR: ['style', 'onerror', 'onclick', 'onload'],
    // hard block script-ish tags
    FORBID_TAGS: ['script', 'style', 'form', 'input', 'button'],
    // keep code block language classes
    ALLOWED_ATTR: [
      'class', 'id', 'title', 'src', 'alt', 'href', 'width', 'height',
      'lang', 'language', 'type', 'name'
    ],
    // allow only http(s) URLs
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  });

  // 2) Post-process: iframes allowlist + image tweaks + empty p cleanup
  const dom = new JSDOM(`<body>${clean}</body>`);
  const doc = dom.window.document;

  // a) iframes: allow only trusted hosts, wrap in .embed for responsive box
  doc.querySelectorAll('iframe').forEach((iframe) => {
    try {
      const src = iframe.getAttribute('src') || '';
      const host = new URL(src, 'https://example.com').host; // base avoids URL error
      if (!ALLOWED_IFRAME_HOSTS.has(host)) {
        iframe.remove(); // drop unknown embeds
        return;
      }
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('referrerpolicy', 'no-referrer');
      iframe.setAttribute('allowfullscreen', 'true');

      // wrap if not already wrapped
      if (!iframe.parentElement?.classList.contains('embed')) {
        const wrap = doc.createElement('div');
        wrap.className = 'embed';
        iframe.replaceWith(wrap);
        wrap.appendChild(iframe);
      }
    } catch {
      iframe.remove();
    }
  });

  // b) images: ensure lazy/async, strip width/height that break layout
  doc.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.removeAttribute('width');
    img.removeAttribute('height');

    // wrap loose <img> in <figure> for nicer captions/layout
    if (!img.closest('figure')) {
      const fig = doc.createElement('figure');
      img.replaceWith(fig);
      fig.appendChild(img);
    }
  });

  // c) remove empty paragraphs that create gaps
  doc.querySelectorAll('p').forEach((p) => {
    if (!p.textContent || !p.textContent.trim()) p.remove();
  });

  return doc.body.innerHTML;
}
