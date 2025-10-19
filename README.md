# Python Zero to One

A static web-based Python tutorial that prioritizes conceptual understanding over syntax memorization. Uses a HyperCard-inspired interface to present 16 sequential lessons with interactive JavaScript visualizations.

## What This Is

Most Python tutorials throw syntax at you immediately. This one takes a different approach: it builds mental models first. Each "card" introduces a programming concept through metaphors and interactive demonstrations before showing code.

Think of it as a guided tour through the *why* of programming, where the *how* follows naturally.

## Quick Start

```bash
# Clone and run
git clone https://github.com/yourusername/python-zero2one.git
cd python-zero2one
python3 -m http.server 8000
```

Open `http://localhost:8000` or just double-click [index.html](index.html).

## Structure

```
python-zero2one/
├── index.html              # Entry point
├── browse.html             # Card grid view
├── cards/                  # Lessons (card_0.html through card_15.html)
│   ├── card_0.html        # The Computational Mindset
│   ├── card_1.html        # Mental Model of Programs
│   └── ...
└── static/
    ├── css/hypercard.css   # Retro styling
    └── js/navigation.js    # Keyboard shortcuts
```

Each card is self-contained HTML with embedded JavaScript for visualizations.

## Content

16 cards covering fundamentals:

**Foundations (0-4)**
Computational thinking, program execution, variables, data types, I/O

**Logic (5-8)**
Comparison operators, boolean logic, conditionals, nesting

**Iteration (9-10)**
While loops, for loops, range()

**Data Structures (11, 13)**
Lists, dictionaries

**Abstraction (12, 14)**
Functions, recursion

**Conclusion (15)**
Next steps and mental model reinforcement

## Navigation

- **Arrow keys** or on-screen buttons to move between cards
- **Cmd/Ctrl + B** to browse all cards
- **Cmd/Ctrl + H** to return home
- Progress bar tracks position (0-100%)

## Deployment

Pure HTML/CSS/JS means it runs anywhere:

**GitHub Pages**: Push to repo → Settings → Pages → Deploy from main
**Netlify/Vercel**: Drag folder to dashboard
**Any web server**: Copy files to document root

See [DEPLOY.md](DEPLOY.md) for details.

## Design Notes

The HyperCard aesthetic isn't just nostalgia—it enforces linear progression. You can't skip ahead easily, which encourages building knowledge sequentially. The constraint is intentional.

All visualizations use vanilla JavaScript. No frameworks, no build process, no dependencies. Just open and run.

## Modifying Content

Source material lives in [coding-explanations.md](coding-explanations.md). Cards are HTML files in `cards/` with inline `<script>` tags for interactivity.

To add/modify cards:
- Maintain the `.hypercard-stack` structure
- Update progress bar width: `(cardNumber/15) * 100`
- Keep prev/next navigation consistent
- Add keyboard shortcuts to `static/js/navigation.js`

See [CLAUDE.md](CLAUDE.md) for detailed editing guidelines.

## License

Educational use. Adapt freely.
