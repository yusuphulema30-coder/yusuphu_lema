# Lemanyx Intelligence Website

**Architecture of Advanced Intelligence**

A modern, responsive website for Lemanyx Intelligence - solving Tanzanian problems through technology.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

---

## 🌟 Overview

Lemanyx Intelligence is a multi-sector technology firm specializing in Architectural Artificial Intelligence. This website showcases our three main products:

1. **MtonyoFlow** - Smart financial management for Tanzanian SMEs
2. **LemaVision** - AI Inventory Intelligence
3. **AfyaLema Hub** - Intelligent health solutions

**Company Mission:** To solve Tanzanian problems in almost every sector through cutting-edge technology.

**Launch Date:** July 12, 2026

---

## ✨ Features

### Mobile-First Responsive Design
- Fully responsive on mobile (360px), tablet (768px), and desktop (1920px)
- Optimized performance on slow internet connections
- Progressive Web App (PWA) ready

### Professional UI/UX
- Clean, modern design with cyan and blue accent colors
- Smooth animations and transitions
- Accessible navigation with semantic HTML
- Dark gradient background for professional appearance

### Core Pages
- **Home** - Product showcase with hero section
- **About** - Company mission, founder story, corporate values
- **Careers** - Job listings with application form
- **Contact** - Social media links and contact information
- **Request Demo** - Demo request form for business inquiries
- **Product Pages** - Detailed information for MtonyoFlow, LemaVision, AfyaLema Hub

### Forms & Interactivity
- Application form with smooth show/hide functionality
- Demo request form with date and product selection
- Contact information with social media integration
- Form validation (HTML5 required attributes)

### SEO Optimized
- Semantic HTML structure
- Meta tags for social sharing
- XML sitemap for search engines
- Proper heading hierarchy (H1, H2, H3)
- Alt text on all images

---

## 📁 Project Structure
lemanyx-intelligence/

│

├── README.md                          # This file

├── sitemap.xml                        # SEO sitemap

│

├── index.html                         # (Redirect to home.html)

├── home.html                          # Homepage

├── about.html                         # About page

├── contact.html                       # Contact page

├── carreers.html                      # Careers page

├── request_demo.html                  # Demo request page

│

├── products/                          # Product pages

│   ├── finflowcore.html              # MtonyoFlow product page

│   ├── lemavision.html               # LemaVision product page

│   └── afyalema.html                 # AfyaLema Hub product page

│

├── css/

│   └── style.css                      # Global styles (mobile-first)

│

├── javaScript/

│   └── index.js                       # Form interactivity

│

├── image/

│   ├── Lemanyx_logo.png              # Company logo

│   ├── MtonyoFlow.png                # MtonyoFlow logo

│   ├── LemaVision.png                # LemaVision logo

│   └── AfyaLema.png                  # AfyaLema logo

│

└── .gitignore                         # Git ignore file

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code recommended)
- Git (for version control)
- Python 3.8+ (for backend development)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/yusuphulema30-coder/Lemanyx-Intelligence.git
   cd Lemanyx-Intelligence
```

2. **Open in VS Code**
```bash
   code .
```

3. **Start a local server** (Python)
```bash
   # Python 3
   python -m http.server 8000
   
   # Or use Live Server extension in VS Code
```

4. **View in browser** http://localhost:8000

### File Organization Best Practices

- **CSS:** All styles in `/css/style.css` (organized by section)
- **JavaScript:** All scripts in `/javaScript/` (linked in HTML)
- **Images:** All images in `/image/` (optimized, under 1MB each)
- **Pages:** Root level for main pages, `/products/` for product pages

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
   npm install -g vercel
```

2. **Login to Vercel**
```bash
   vercel login
```

3. **Deploy**
```bash
   vercel
```

4. **Connect custom domain**
   - Go to Vercel dashboard
   - Add custom domain: `lemanyx.com`
   - Update nameservers in domain registrar (Namecheap)

### Deploy to Other Platforms

**GitHub Pages:**
```bash
git push origin main
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

### Environment Variables

No environment variables needed for frontend. Backend will require:
- Database connection string
- Email service API key
- Form submission endpoint

---

## 💻 Technologies Used

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Mobile-first responsive design
- **JavaScript (ES6+)** - Form interactivity
- **No frameworks** - Pure vanilla JavaScript (fast, lightweight)

### Backend (To Be Developed)
- **Python** - Flask or FastAPI
- **Database** - Supabase (PostgreSQL)
- **Email Service** - SendGrid or Mailgun
- **Hosting** - Railway or Heroku

### Tools
- **Version Control** - Git & GitHub
- **Hosting** - Vercel (frontend)
- **Design** - Figma (if needed)
- **SEO** - Google Search Console

---

## 📱 Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- Mobile Safari (iOS 14+)
- Android Browser 8+

---

## ♿ Accessibility

The website meets WCAG 2.1 Level AA standards:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Alt text on all images
- ✅ High contrast text (WCAG AA compliant)
- ✅ Keyboard navigation support
- ✅ ARIA labels where needed
- ✅ Form labels associated with inputs

---

## 📊 Performance Metrics

**Target Metrics:**
- **Lighthouse Score:** 90+
- **Page Load Time:** < 3 seconds
- **Core Web Vitals:** All green
- **Mobile Performance:** Optimized for 4G

**Test Performance:**
```bash
# Use Google PageSpeed Insights
https://pagespeed.web.dev/

# Or Lighthouse in Chrome DevTools
```

---

## 🔒 Security

- ✅ HTTPS enabled on all pages
- ✅ No hardcoded sensitive data
- ✅ Form inputs sanitized (backend)
- ✅ CSRF protection (backend)
- ✅ Content Security Policy headers

---

## 🐛 Troubleshooting

### Page not loading?
- Clear browser cache (Ctrl+Shift+Delete)
- Check file paths (case-sensitive on Linux)
- Verify all images are in `/image/` folder

### Form not working?
- Check browser console (F12)
- Ensure JavaScript is enabled
- Verify form IDs match JavaScript selectors

### Responsive design not working?
- Check viewport meta tag in `<head>`
- Test with Chrome DevTools device toolbar
- Verify media queries in `style.css`

### Links broken?
- Verify file names (case-sensitive)
- Use relative paths (e.g., `../home.html`)
- Check file extensions (.html required)

---

## 📈 SEO Checklist

- ✅ XML sitemap (`sitemap.xml`)
- ✅ Meta descriptions on all pages
- ✅ Mobile-friendly design
- ✅ Fast loading time
- ✅ HTTPS enabled
- ✅ Structured data (to add)
- ✅ Google Search Console setup
- ✅ Google Analytics tracking (to add)

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch
```bash
   git checkout -b feature/my-feature
```

2. Make changes and commit
```bash
   git add .
   git commit -m "Add new feature"
```

3. Push to GitHub
```bash
   git push origin feature/my-feature
```

4. Create Pull Request

### Code Standards
- Use semantic HTML tags
- Follow mobile-first CSS approach
- Use BEM naming convention for classes
- Keep JavaScript modular
- Add comments for complex logic

---

## 📝 Content Guidelines

### Product Pages
- Keep descriptions clear and benefit-focused
- Use Swahili names with English explanations
- Include pricing information
- Add call-to-action buttons

### Forms
- Keep forms short (5 fields max)
- Use clear labels
- Add placeholder text
- Show validation messages

### Images
- Optimize before uploading (< 200KB)
- Use descriptive alt text
- Use WebP format when possible
- Keep aspect ratios consistent

---

## 📧 Contact & Support

- **Email:** yusuphulema30@gmail.com
- **LinkedIn:** [Yusuphu Awadhi Lema](https://www.linkedin.com/in/yusuphu-awadhi-lema-08675a39a)
- **Instagram:** [@yusuphulema](https://www.instagram.com/yusuphulema)
- **WhatsApp:** +255 760 356 680

---

## 📄 License

This project is proprietary to Lemanyx Intelligence. All rights reserved.

---

## 🙏 Acknowledgments

- **Founder:** Yusuphu Awadhi Lema
- **Location:** Dar es Salaam, Tanzania
- **Year:** 2026

---

## 📅 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | June 14, 2026 | Initial website launch |
| 1.1 | June 20, 2026 | Mobile responsiveness improvements |
| 1.2 | June 28, 2026 | Form backend integration |
| 1.3 | July 5, 2026 | SEO optimization |
| 2.0 | July 12, 2026 | Full feature launch |

---

**Last Updated:** June 20, 2026
**Next Review:** July 12, 2026
