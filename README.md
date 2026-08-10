# BingeTracker Pre-Launch Static Landing Pages (GitHub Pages Stack)

These 3 standalone landing pages are built with standard HTML5, CSS3, and Vanilla JavaScript. They require **$0/month hosting**, zero backend server setup, and are optimized for direct hosting on **GitHub Pages**, Cloudflare Pages, or Netlify.

---

## 📁 Directory Structure

```
marketing/landing-pages/
├── index.html                    # Variant 1: Main Founding Member Waitlist Page (50% off first year)
├── bleed-calculator/
│   └── index.html                # Variant 2: Interactive Streaming Bleed Calculator
├── vs-rocket-money/
│   └── index.html                # Variant 3: "Rocket Money for Streaming" Comparison
├── shared/
│   ├── styles.css                # Glassmorphic dark theme design system
│   └── waitlist-form.js          # Client-side form handler & Van Westendorp pricing survey modal
└── README.md                     # Deployment guide
```

---

## ⚡ 1. How to Test & Preview Locally

You can open any of the `.html` files directly in your web browser, or serve them locally using any simple HTTP server:

```bash
# Option A: Python simple server
cd marketing/landing-pages
python3 -m http.server 8000

# Open in browser: http://localhost:8000
```

When previewing, you can use the **Variant Switcher Bar** in the top navigation header to toggle smoothly between all 3 variants:
- **Variant 1:** `http://localhost:8000/index.html`
- **Variant 2:** `http://localhost:8000/bleed-calculator/index.html`
- **Variant 3:** `http://localhost:8000/vs-rocket-money/index.html`

---

## 📧 2. Email Capture Setup (Free $0 Stack)

By default, the forms work in preview mode (simulates submission and triggers success messages). To forward real signups directly to your email inbox:

1. Go to [Web3Forms.com](https://web3forms.com/) (Free, no account needed).
2. Enter your notification email address to receive your free Access Key.
3. Open `marketing/landing-pages/shared/waitlist-form.js`.
4. Replace `YOUR_WEB3FORMS_ACCESS_KEY` on Line 9 with your actual key:

```js
const WEB3FORMS_ACCESS_KEY = "your-actual-web3forms-key-here";
```

All waitlist signups from all 3 variants will immediately email you with the user's email address and variant tag (e.g. `main_early_bird`, `calculator_gate`, `comparison_rocket_money`).

---

## 🚀 3. GitHub Pages Deployment Guide ($0 Hosting)

### Method A: Deploy from `docs/` folder or separate branch

1. Copy the contents of `marketing/landing-pages/` to a `docs/` directory in your repo or to a `gh-pages` branch.
2. Push your code to GitHub.
3. In your GitHub Repository:
   - Go to **Settings** → **Pages**.
   - Under **Source**, select **Deploy from a branch**.
   - Choose your branch (e.g., `main` with `/docs` folder or `gh-pages`).
   - Click **Save**.

Your 3 landing pages will be live globally at `https://<username>.github.io/<repo-name>/` in less than 2 minutes!
