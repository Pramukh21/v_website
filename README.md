# Valentine Website 💖

A cute pastel mini-site with playful animations and a "YES / NO" interaction:
- **NO button** runs away from the cursor.
- **YES button** reveals your custom celebration message.

## 1) Quick local check (only for you)

You run this once to verify everything before sharing.

1. Open terminal in this project folder.
2. Start a local server:

```bash
python3 -m http.server 8080
```

3. Open this in your browser:

```text
http://localhost:8080
```

4. Stop server later with `Ctrl + C` in terminal.

---

## 2) Quick testing checklist (before sending link)

Open `http://localhost:8080` and verify:

1. Landing text shows:
   - `Subadhraaaaaaaaaaaa.....`
   - `Will you be my Valentine?`
   - `God will guide you in selecting the options`
2. Move mouse near **NO** button → it should run away.
3. Click **YES** → success card appears with your custom congratulation message.
4. Click **Play Again** → returns to first screen.
5. Resize browser window once → layout still looks nice.

---

## 3) Share by URL (she does NOT need to run code)

Use **GitHub Pages**. Once published, send her only the URL.

### Step-by-step (recommended)

1. Create a new GitHub repository (example: `valentine-site`).
2. Push this project to GitHub:

```bash
git init
git add .
git commit -m "Valentine website"
git branch -M main
git remote add origin https://github.com/<your-username>/valentine-site.git
git push -u origin main
```

3. Open your repo in GitHub.
4. Go to **Settings → Pages**.
5. In **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
6. Click **Save**.
7. Wait 1–3 minutes and refresh Pages settings.
8. Copy your live URL (example):

```text
https://<your-username>.github.io/valentine-site/
```

9. Send that link to her 💌

She only needs to click that URL in any browser.

---

## 4) If your URL shows 404 initially

This is common for 1–2 minutes after first setup.

- Wait a little and refresh.
- Re-check **Settings → Pages** branch/folder selection.
- Ensure your latest commit is pushed to `main`.

---

## 5) Fast customization guide

- Edit text in `index.html`.
- Edit colors in `styles.css` at `:root` variables.
- Tune NO-button movement in `script.js`:
  - `pushStrength` (bigger = faster escape)
  - proximity checks inside `isClose`.
