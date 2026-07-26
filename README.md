# Happy Birthday, Manogna 🌹

A one-page birthday site: photo gallery, video section, and an interactive
"open the envelope" love letter.

## Add your photos

Drop images into `assets/photos/` named exactly:

```
photo-1.jpg
photo-2.jpg
photo-3.jpg
photo-4.jpg
photo-5.jpg
photo-6.jpg
```

Using `.png` or `.webp` instead? Just update the matching `src="..."` in
`index.html` (search for `assets/photos/`).

Until a file exists, that slot shows an elegant dashed placeholder instead
of a broken image — so you can add photos one at a time.

## Add your videos

Drop clips into `assets/videos/` named:

```
video-1.mp4
video-2.mp4
```

Same idea — empty slots show a clean placeholder until a file is added.

## Customize the letter

The full letter lives in `index.html` inside `<article class="letter-paper">`.
Edit the text directly there — line breaks are `<br>` tags.

## Colors / fonts (design tokens)

All defined at the top of `style.css` under `:root` — change the hex values
there to retheme the whole site in one place:

- `--wine` `#6B1F2A` — headings, envelope
- `--rose` `#E8A0A8` — petals, secondary accents
- `--gold` `#C9A66B` — seal, dividers
- `--blush` / `--blush-soft` / `--cream` — backgrounds
- Fonts: Cormorant Garamond (display), Parisienne (script), Jost (body)

## Deploy to Vercel

**Option A — Vercel CLI**
```
npm i -g vercel
cd manogna-birthday
vercel
```

**Option B — GitHub + Vercel dashboard**
1. Push this folder to a new GitHub repo.
2. In Vercel, "Add New Project" → import that repo.
3. Framework preset: **Other** (it's a static site, no build step needed).
4. Deploy.

That's it — no build tooling, no dependencies, just static HTML/CSS/JS.
