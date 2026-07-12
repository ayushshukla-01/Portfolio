# Ayush Shukla — Portfolio

A responsive, animated personal portfolio built with vanilla HTML, CSS, and JavaScript — featuring a glassmorphism UI, 3D hover interactions, an interactive particle background, and modal-based project/certificate viewers.

🔗 **Live site:** [add your deployed URL here]
📄 **Resume:** [`Ayush_Shukla_FS.pdf`](./Ayush_Shukla_FS.pdf)

---

## Overview

I'm a Computer Science undergraduate specializing in full-stack web and cross-platform development, with a focus on real-time systems and backend architecture. This site showcases my experience (RDSO, MANIT), projects (real-time chat, soil suitability app, placement portal, AI chatbot), skills, education, and certifications.

## Features

- **Typing effect hero** — animated role rotation (`typing.js` logic in `script.js`)
- **Interactive particle background** — canvas-based, mouse-reactive, connects nearby particles
- **Glassmorphism sections** — translucent panels with backdrop blur
- **3D hover interactions** — mouse-tracking tilt on project, skill, education, and certificate cards
- **Modal system** — profile picture zoom, per-project detail views, certificate viewer, all closeable via click-outside or `Esc`
- **Scroll reveal animations** via [ScrollReveal.js](https://scrollrevealjs.org/)
- **Fully responsive**, with `prefers-reduced-motion` support for accessibility

## Tech Stack

| Layer      | Tech                                   |
|------------|-----------------------------------------|
| Structure  | HTML5                                   |
| Styling    | CSS3 (custom properties, glassmorphism, 3D transforms) |
| Behavior   | Vanilla JavaScript (ES6+)               |
| Animation  | Canvas API, ScrollReveal.js              |

No frameworks, build tools, or dependencies beyond the ScrollReveal CDN script — open `index.html` and it runs.

## Project Structure

```
portfolio/
├── index.html              # Main page — hero, about, skills, projects, experience, education, certificates, contact
├── style.css                # All styling — theme variables, glassmorphism, 3D hover effects, responsive rules
├── script.js                 # Typing effect, particle background, modal logic, 3D tilt interactions
├── Ayush_Shukla_FS.pdf        # Downloadable resume
├── myphoto.JPG                # Profile photo
├── favicon.ico                 # Site favicon
├── portfolio-preview.png        # Project screenshot
├── soil-app-ui.png                # Project screenshot
├── chat-app-ui.png                  # Project screenshot
├── placement-portal-ui.png            # Project screenshot
├── edu-space-interface.png             # Project screenshot
├── rdso-cert.jpg                         # Certificate image
├── manit-cert.jpg                         # Certificate image
├── blockchain-cert.jpg                     # Certificate image
├── nss-cert.jpg                             # Certificate image
└── accenture-cert.jpg                        # Certificate image
```

> Note: image assets referenced in `index.html` need to be added to the root folder for them to render — they aren't included in this repo export.

## Running Locally

No build step required.

```bash
git clone https://github.com/ayushshukla/portfolio.git
cd portfolio
# then just open index.html in a browser, or serve it:
npx serve .
```

## Sections

- **About** — background and specialization
- **Skills** — languages, frameworks, tools
- **Projects** — Real-Time Chat App, Soil Suitability App, Placement Portal, AI Chatbot (Edu-Space), this Portfolio
- **Experience** — RDSO (Full Stack Developer Intern), MANIT (Summer Research Intern)
- **Education** — B.Tech CSE, Babasaheb Bhimrao Ambedkar University
- **Certificates** — RDSO, MANIT, AICTE Blockchain, NSS, Accenture Data Analytics
- **Contact** — email, phone, LinkedIn, GitHub

## Contact

- 📧 [ayushshukla8845@gmail.com](mailto:ayushshukla8845@gmail.com)
- 📱 +91-6390841388
- 🔗 [LinkedIn](https://www.linkedin.com/in/ayush-shukla-b394a3201)
- 💻 [GitHub](https://github.com/ayushshukla)

---

© 2025 Ayush Shukla
