/* ==========================================================
   The collection.
   Every piece lives here; the home page, collection and piece
   pages all read from this list.

   PLACEHOLDERS: names, prices, specs and descriptions below are
   stand-ins until the real collection is confirmed.
   To add a photo, set `images: ["assets/img/your-photo.jpg", ...]`
   and the line drawing is replaced automatically.
   ========================================================== */

window.PIECES = [
  {
    id: "tennis-bracelet",
    name: "Tennis Bracelet",
    category: "bracelets",
    finish: "Rhodium-plated sterling silver",
    price: 890,
    featured: true,
    art: "tennis",
    description: "A continuous line of round brilliant moissanite, each stone individually set and checked by hand. Fluid on the wrist, secured by a hidden box clasp with a double safety latch.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D–E (colourless)",
      Cut: "Excellent",
      "Total weight": "5.0 ct DEW",
      Metal: "925 sterling silver",
      Finish: "Rhodium plating, 0.5 µm",
      Length: "17 cm (other lengths on request)"
    }
  },
  {
    id: "emerald-studs",
    name: "Emerald-Cut Studs",
    category: "earrings",
    finish: "Platinum-plated sterling silver",
    price: 640,
    featured: true,
    art: "emeraldPair",
    description: "Step-cut moissanite in a slender four-claw setting. The long, clean facets of the emerald cut give a calm, mirrored brilliance rather than sparkle for its own sake.",
    specs: {
      Stone: "Moissanite, emerald cut",
      Colour: "D (colourless)",
      Cut: "Excellent",
      "Stone size": "7 × 5 mm, 1.0 ct DEW each",
      Metal: "925 sterling silver",
      Finish: "Platinum plating, 0.5 µm",
      Back: "Screw back"
    }
  },
  {
    id: "solitaire-pendant",
    name: "Solitaire Pendant",
    category: "necklaces",
    finish: "Rhodium-plated sterling silver",
    price: 560,
    featured: true,
    art: "pendant",
    description: "A single round brilliant moissanite suspended on a fine cable chain. Quiet enough for every day, bright enough for evening.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D (colourless)",
      Cut: "Excellent",
      "Stone size": "6.5 mm, 1.0 ct DEW",
      Metal: "925 sterling silver",
      Finish: "Rhodium plating, 0.5 µm",
      Chain: "42–45 cm adjustable"
    }
  },
  {
    id: "eternity-band",
    name: "Eternity Band",
    category: "rings",
    finish: "Gold vermeil",
    price: 720,
    featured: true,
    art: "eternity",
    description: "Moissanite set all the way around in a slim shared-claw band. Designed to be worn alone or stacked.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D–E (colourless)",
      Cut: "Excellent",
      "Total weight": "1.8 ct DEW",
      Metal: "925 sterling silver",
      Finish: "18k gold vermeil, 2.5 µm",
      Sizes: "On enquiry"
    }
  },
  {
    id: "emerald-solitaire-ring",
    name: "Emerald-Cut Solitaire",
    category: "rings",
    finish: "Platinum-plated sterling silver",
    price: 1450,
    art: "ring",
    description: "A generous step-cut moissanite raised on a fine knife-edge band. Architectural, clear and quietly bold.",
    specs: {
      Stone: "Moissanite, emerald cut",
      Colour: "D (colourless)",
      Cut: "Excellent",
      "Stone size": "9 × 7 mm, 2.0 ct DEW",
      Metal: "925 sterling silver",
      Finish: "Platinum plating, 0.5 µm",
      Sizes: "On enquiry"
    }
  },
  {
    id: "line-hoops",
    name: "Line Hoops",
    category: "earrings",
    finish: "Rhodium-plated sterling silver",
    price: 480,
    art: "hoops",
    description: "Small hoops channel-set with moissanite on the front face. An easy, everyday brilliance.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D–E (colourless)",
      Cut: "Excellent",
      Diameter: "15 mm",
      Metal: "925 sterling silver",
      Finish: "Rhodium plating, 0.5 µm",
      Closure: "Hinged"
    }
  },
  {
    id: "riviere-necklace",
    name: "Rivière Necklace",
    category: "necklaces",
    finish: "Rhodium-plated sterling silver",
    price: 1890,
    art: "riviere",
    description: "The tennis line, worn at the collarbone. Graduated moissanite set end to end for a continuous ribbon of light.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D–E (colourless)",
      Cut: "Excellent",
      "Total weight": "14 ct DEW",
      Metal: "925 sterling silver",
      Finish: "Rhodium plating, 0.5 µm",
      Length: "40 cm"
    }
  },
  {
    id: "line-bracelet-vermeil",
    name: "Tennis Bracelet, Vermeil",
    category: "bracelets",
    finish: "Gold vermeil",
    price: 980,
    art: "tennis",
    description: "Our tennis bracelet in warm 18k gold vermeil, for those who wear gold.",
    specs: {
      Stone: "Moissanite, round brilliant",
      Colour: "D–E (colourless)",
      Cut: "Excellent",
      "Total weight": "5.0 ct DEW",
      Metal: "925 sterling silver",
      Finish: "18k gold vermeil, 2.5 µm",
      Length: "17 cm (other lengths on request)"
    }
  }
];

window.CATEGORIES = {
  bracelets: "Bracelets",
  earrings: "Earrings",
  necklaces: "Necklaces",
  rings: "Rings"
};

/* ----------------------------------------------------------
   Placeholder line drawings (viewBox 0 0 100 100).
   Shown only until real photography exists.
   ---------------------------------------------------------- */
(function () {
  const ring = (cx, cy, rx, ry, n, r, start = 0, end = Math.PI * 2) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const t = start + (end - start) * (i / (end - start >= Math.PI * 2 ? n : n - 1));
      s += `<circle class="stone" cx="${(cx + rx * Math.cos(t)).toFixed(2)}" cy="${(cy + ry * Math.sin(t)).toFixed(2)}" r="${r}"/>`;
    }
    return s;
  };

  const emerald = (x, y, w, h) => {
    const c = Math.min(w, h) * 0.18;
    const oct = (x, y, w, h, c) =>
      `${x + c},${y} ${x + w - c},${y} ${x + w},${y + c} ${x + w},${y + h - c} ${x + w - c},${y + h} ${x + c},${y + h} ${x},${y + h - c} ${x},${y + c}`;
    let s = `<polygon class="stone" points="${oct(x, y, w, h, c)}"/>`;
    [0.18, 0.34].forEach(k => {
      const dx = w * k / 2, dy = h * k / 2;
      s += `<polygon points="${oct(x + dx, y + dy, w - dx * 2, h - dy * 2, c * (1 - k))}"/>`;
    });
    const ix = w * 0.17, iy = h * 0.17;
    s += `<line x1="${x}" y1="${y + c}" x2="${x + ix}" y2="${y + iy + c * .7}"/>`;
    s += `<line x1="${x + w}" y1="${y + c}" x2="${x + w - ix}" y2="${y + iy + c * .7}"/>`;
    s += `<line x1="${x}" y1="${y + h - c}" x2="${x + ix}" y2="${y + h - iy - c * .7}"/>`;
    s += `<line x1="${x + w}" y1="${y + h - c}" x2="${x + w - ix}" y2="${y + h - iy - c * .7}"/>`;
    return s;
  };

  const brilliant = (cx, cy, r) => {
    let s = `<circle class="stone" cx="${cx}" cy="${cy}" r="${r}"/>`;
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const t = (Math.PI / 4) * i - Math.PI / 2;
      pts.push(`${(cx + r * .55 * Math.cos(t)).toFixed(2)},${(cy + r * .55 * Math.sin(t)).toFixed(2)}`);
      const t2 = t + Math.PI / 8;
      s += `<line x1="${(cx + r * .55 * Math.cos(t)).toFixed(2)}" y1="${(cy + r * .55 * Math.sin(t)).toFixed(2)}" x2="${(cx + r * Math.cos(t2)).toFixed(2)}" y2="${(cy + r * Math.sin(t2)).toFixed(2)}"/>`;
    }
    s += `<polygon points="${pts.join(" ")}"/>`;
    return s;
  };

  const art = {
    tennis: () => `<ellipse cx="50" cy="50" rx="38" ry="20"/>` + ring(50, 50, 38, 20, 34, 1.9),
    emeraldPair: () => emerald(20, 26, 24, 34) + emerald(56, 26, 24, 34) +
      `<line x1="32" y1="64" x2="32" y2="74"/><line x1="68" y1="64" x2="68" y2="74"/>`,
    pendant: () => `<path d="M14 6 Q50 66 86 6"/><circle cx="50" cy="50" r="1.4"/>` +
      `<line x1="50" y1="51.4" x2="50" y2="58"/>` + brilliant(50, 70, 11),
    eternity: () => `<ellipse cx="50" cy="56" rx="30" ry="12"/><ellipse cx="50" cy="56" rx="26" ry="9.5"/>` +
      ring(50, 56, 28, 10.8, 30, 1.7),
    ring: () => `<ellipse cx="50" cy="64" rx="24" ry="10"/><ellipse cx="50" cy="64" rx="21" ry="8"/>` +
      `<line x1="40" y1="46" x2="44" y2="56"/><line x1="60" y1="46" x2="56" y2="56"/>` + emerald(37, 18, 26, 32),
    hoops: () => `<circle cx="32" cy="52" r="15"/><circle cx="32" cy="52" r="12.5"/>` +
      `<circle cx="68" cy="52" r="15"/><circle cx="68" cy="52" r="12.5"/>` +
      ring(32, 52, 13.75, 13.75, 9, 1.1, Math.PI * .15, Math.PI * .85) +
      ring(68, 52, 13.75, 13.75, 9, 1.1, Math.PI * .15, Math.PI * .85),
    riviere: () => `<path d="M10 14 Q50 92 90 14"/>` +
      Array.from({ length: 21 }, (_, i) => {
        const t = i / 20, x = 10 + 80 * t, y = (1 - t) * (1 - t) * 14 + 2 * (1 - t) * t * 92 + t * t * 14;
        const r = 1.2 + 1.3 * Math.sin(Math.PI * t);
        return `<circle class="stone" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${r.toFixed(2)}"/>`;
      }).join("")
  };

  window.pieceArt = function (key, label) {
    const body = (art[key] || art.pendant)();
    return `<svg class="art" viewBox="0 0 100 100" role="img" aria-label="${label} (illustration)">${body}</svg>`;
  };
})();
