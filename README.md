# Valentine Website

A cute pastel mini-site with playful animations and a "YES / NO" interaction:
- **NO button** quickly escapes your cursor.
- **YES button** reveals your custom celebration message.
- Optional **photo memories gallery** can appear after YES.

## 1) Quick local check (only for you)

1. Open terminal in this project folder.
2. Start a local server:

```bash
python3 -m http.server 8080
```

3. Open in your browser:

```text
http://localhost:8080
```

4. Stop server with `Ctrl + C`.

---

## 2) Quick testing checklist

Open `http://localhost:8080` and verify:

1. Landing text shows correctly.
2. Move mouse near **NO** button → it should react quickly and jump away.
3. Click **YES** → success card appears.
4. Click **Play Again** → returns to the first screen.
5. Resize browser window once → layout still looks good.

---

## 3) Add your couple photos (shown after YES)

1. Create this folder if it does not exist:

```bash
mkdir -p assets/photos
```

2. Copy your photos into `assets/photos/` (for example `us-1.jpg`, `us-2.jpg`, etc).
3. Open `script.js` and update `romanticMemories`:

```js
const romanticMemories = [
  "assets/photos/us-1.jpg",
  "assets/photos/us-2.jpg",
  "assets/photos/us-3.jpg",
];
```

4. Refresh the page and click **YES** to see the gallery.

> Keep file names simple (letters, numbers, `-`) and include correct extensions (`.jpg`, `.png`, `.webp`).

---

## 4) Share by URL (she does NOT need to run code)

Use **GitHub Pages**.

1. Push this project to GitHub.
2. In your repo go to **Settings → Pages**.
3. Set source to **Deploy from a branch** and choose `main` + `/ (root)`.
4. Save and wait 1–3 minutes.
5. Send the generated URL 💌

---

## 5) Fast customization guide

- Edit text in `index.html`.
- Edit colors in `styles.css` (`:root` variables).
- Tune NO-button behavior in `script.js`:
  - `REPEL_RADIUS` (larger = reacts sooner)
  - `MAX_PUSH` (larger = faster jumps)
  - `ESCAPE_COOLDOWN_MS` (smaller = updates more frequently)
