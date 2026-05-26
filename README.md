# Musikuli Dairies Limited — Company Website

A modern, professional Next.js website for **Musikuli Dairies Limited**, deployable on GitHub + Vercel.

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/) installed
- A free [GitHub](https://github.com) account
- A free [Vercel](https://vercel.com) account

### Install & Run Locally

```bash
# 1. Navigate into the project folder
cd "musikuli-dairies"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Set Up the Quote Form (Formspree)

1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Create a new form and set the email to `musikuliimran@gmail.com`
3. Copy your **Form ID** (looks like `xwpbdgek`)
4. Open `app/quote/page.tsx` and replace `xwpbdgek` with your actual Form ID:
   ```tsx
   const FORMSPREE_ID = 'YOUR_FORM_ID_HERE';
   ```

---

## 🌍 Deploy to Vercel (Free Hosting)

### Step 1: Push to GitHub
```bash
# Inside the musikuli-dairies folder:
git init
git add .
git commit -m "Initial commit — Musikuli Dairies website"

# Create a new repo on github.com then:
git remote add origin https://github.com/YOUR_USERNAME/musikuli-dairies.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"** → Import your `musikuli-dairies` repository
3. Leave all settings as default → Click **"Deploy"**
4. Your site will be live at `https://musikuli-dairies.vercel.app` 🎉

### Step 3: Add Your Logo
Replace `public/images/logo.png` with your actual company logo file.

---

## 📁 Project Structure

```
musikuli-dairies/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home page
│   ├── about/page.tsx      # About Us
│   ├── services/page.tsx   # Products & Services
│   ├── portfolio/page.tsx  # Photo Gallery
│   ├── pricing/page.tsx    # Pricing
│   ├── quote/page.tsx      # Request a Quote (Formspree)
│   └── contact/page.tsx    # Contact Us
├── components/
│   ├── Navbar.tsx          # Responsive navbar
│   └── Footer.tsx          # Footer
├── public/
│   └── images/             # All website images
└── app/globals.css         # Global design system
```

---

## 📞 Contact

- **Email**: musikuliimran@gmail.com
- **Phone**: +256 200 933 861
- **Address**: P.O Box 170174, Luwero-Uganda
