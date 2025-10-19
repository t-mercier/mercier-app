# mercier.app 🎭

A playful hacker-style website with a fullscreen prank intro and personal CV reveal.

## 🚀 Quick Start

1. **Open this folder in VS Code/Cursor**
2. **Accept the devcontainer prompt** when it appears
3. **Wait for the container to build** (first time only)
4. **Run the development server:**

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (for animations)
- **Google Fonts:** Inter + Fira Code (monospace aesthetic)
- **Devcontainer** (consistent development environment)

---

## 📁 Project Structure

```
mercier-app/
├── .devcontainer/
│   └── devcontainer.json     # Devcontainer configuration
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # TailwindCSS theme
├── next.config.js           # Next.js config
├── public/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx       # Root layout
    │   ├── page.tsx         # Main page
    │   └── globals.css      # Global styles
    └── components/
        ├── LandingSplash.tsx   # Landing screen
        ├── HackerOverlay.tsx   # Hacking animation
        ├── CVSection.tsx       # CV reveal
        └── Footer.tsx          # Footer
```

---

## 🎮 How It Works

1. **Landing Screen**  
   Visitor sees: *"Will you dare to click?"*  
   Clicks → fullscreen mode activates.

2. **Hacker Overlay**  
   Fake terminal messages appear:
   - "Connecting to remote host..."
   - "!!! WARNING: FILESYSTEM CORRUPTED !!!"
   - "Deleting user data..."
   - "ALL FILES WILL BE REMOVED IN: 00:00:10"

3. **Reveal**  
   After ~8–10 seconds (or clicking "REVEAL THE TRUTH"):  
   *"Hehe — got you! Welcome to my small universe."*

4. **CV Section**  
   Shows personal info, skills, and contact details.

**Privacy:** No data is collected or stored. Pure client-side fun.

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mercier-app.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click **"Deploy"**

### Step 3: Add Custom Domain

1. In Vercel dashboard, go to **Settings → Domains**
2. Add `mercier.app`
3. Follow the DNS setup guide provided by Vercel
4. Update your domain's DNS records (usually at your registrar)

Example DNS records:
```
Type: A     Name: @       Value: 76.76.21.21
Type: CNAME Name: www     Value: cname.vercel-dns.com
```

Wait a few minutes for DNS propagation, then visit **https://mercier.app** 🎉

---

## 🎨 Customization

### Update Your Info

Edit `src/components/CVSection.tsx`:
- Name
- Title
- Skills
- Contact email

### Change Hacker Messages

Edit `src/components/HackerOverlay.tsx`:
- Modify the `hackerMessages` array

### Adjust Colors

Edit `tailwind.config.ts`:
- Change hacker green theme
- Modify animations

---

## 🧪 Manual Setup (Without Devcontainer)

If you prefer running without devcontainer:

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 📝 License

MIT — feel free to use this as a template for your own playful portfolio!

---

## 👤 Contact

**Timothée Mercier**  
Software Engineer II @ TomTom  
📧 [hello@mercier.app](mailto:hello@mercier.app)  
💼 [LinkedIn](https://www.linkedin.com/in/timotheem/)

---

**Enjoy the prank!** 😈