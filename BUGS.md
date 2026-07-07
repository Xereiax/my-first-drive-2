# Bug audit — My First Drive

Audited: all 5 pages (index, about, areas, reviews, contact) via static analysis
(broken links, duplicate IDs, missing alt text, WCAG contrast math) and live
browser testing (console errors, network requests, nav toggle, accordion,
contact form validation, compare selector, announcement bar, keyboard focus).

No console errors, no 404s, no broken internal links/anchors, no duplicate
IDs, no missing alt text found. All 4 bugs below are accessibility/keyboard
issues, confirmed by direct interaction, not just code review.

## 1. Mobile nav panel is keyboard-focusable while closed (site-wide)
**Status:** fixed

`#mobile-nav` is hidden by sliding off-screen (`transform: translateY(-100%)`),
not `display:none`. Its 5 links + close button stay in the tab order even
when the panel has never been opened — confirmed by calling `.focus()` on a
closed panel's link and it took focus. A keyboard user tabs from the header's
visible nav straight into 6 invisible off-screen controls before reaching
page content, on every page.

**Fix:** mark the panel `inert` by default in HTML, toggle it off/on in
`initMobileNav()` alongside the existing `is-open` class.

## 2. Announcement bar stays keyboard-focusable after dismiss (site-wide)
**Status:** fixed

Clicking the dismiss button collapses the bar via CSS (`max-height:0;
overflow:hidden`) but never removes it from the tab order — confirmed the
same way as #1. Only the *returning-visitor* path (sessionStorage check on
load) sets `display:none`; the interactive dismiss click does not.

**Fix:** set `bar.inert = true` in the close handler, matching the returning-
visitor path's already-correct behavior.

## 3. Review star rating fails WCAG contrast (reviews.html)
**Status:** fixed

`.review-card__stars` renders gold (`#C9963E`) on a white card
(`.review-card { background: var(--white) }`) — contrast ratio 2.65:1,
below the 3:1 minimum WCAG AA requires even for large/graphical text.
Visually confirmed: the stars render noticeably faint next to the card's
other text. (Screen-reader users aren't affected — there's already an
`aria-label="5 out of 5 stars"` — this only affects sighted low-vision
users reading the star glyphs directly.)

**Fix:** switch to `--gold-dark` (#A87A2E, 3.83:1 on white), the site's
existing "readable gold" variant used elsewhere (e.g. active nav state).

## 4. Decorative custom-cursor labels exposed to screen readers
**Status:** fixed

The custom-cursor label elements (`<div cursor class="cursor">Expand</div>`,
and its `Read`/`View`/`Enquire` siblings — 8 instances across about.html,
areas.html, index.html ×5, reviews.html) have no `aria-hidden="true"`. JS
relocates each one to the end of `<body>` on load, so a screen-reader user
walking the page linearly hits a cluster of orphaned, contextless words
("Expand", "Read", "View", "Enquire") with no relation to nearby content.

**Fix:** add `aria-hidden="true"` to all 8 instances.

---

## Also noticed, not fixing here
- `--bar-h` CSS custom property was computed and set by
  `initAnnouncementBar()` but never read by any CSS rule — the header's
  `position: sticky` already handles the reflow correctly without it. Dead
  code, not a bug, but removed while fixing #2 since that function was
  already being touched.
- `WHATSAPP_NUMBER`, the JSON-LD `telephone`/`url`, and the contact form's
  "not wired to a backend yet" notice are pre-existing, intentionally
  flagged TODOs waiting on real business info — not bugs to silently
  paper over with fake data.
