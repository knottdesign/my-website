# Jewelry site (working name)

Static showcase site: moissanite set in sterling silver. Plain HTML/CSS/JS, no build step.

## Change things in one place
- **Brand name, email, Instagram:** `assets/js/site.js` → `SITE`
- **Pieces (names, prices, specs, photos):** `assets/js/pieces.js`
- **Colours, fonts, motion timing:** top of `assets/css/site.css`

## Pages
`index.html` home · `collection.html` all pieces (filter with `?c=rings`) · `piece.html?id=…` single piece · `about.html` story & materials · `enquire.html` enquiry / order

## Placeholders still to replace
Brand name, contact email, all prices and specs, story copy, line drawings (replaced automatically when a piece gets `images`), hero film (slot in `index.html`).

Preview locally: `python3 -m http.server` then open http://localhost:8000
