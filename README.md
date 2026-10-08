# 📰 CHRONICLE — Global News & Editorial Blogging Platform

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Production-Ready-success?style=for-the-badge)]()

**CHRONICLE** is a high-performance, responsive editorial web application integrating real-time world headlines, multimodal weather forecasting, an interactive calendar, and a community blogging platform. Built with **React 19**, **Vite**, and a bespoke vanilla CSS design system inspired by modern luxury glassmorphism and editorial aesthetics.

---

## 📸 Highlights & Showcase

- **Real-Time Global News Engine**: Live breaking stories and categorized feeds powered by GNews REST APIs with intelligent offline fallback datasets.
- **Interactive Weather Station**: Live temperature, weather condition animations, humidity, wind velocity, and quick popular city presets powered by OpenWeatherMap API.
- **Dynamic Editorial Calendar**: Interactive date navigator with today indicators, month rollovers, and formatted date tracking.
- **Community Journal & Blog Platform**: Interactive article authoring system with preset cover selectors, local storage persistence, and reader view.
- **Personalized Reading List**: Instant bookmarking drawer with live search filtering, item removal, and bulk clear options.
- **Full Responsive Architecture**: Optimized for smartphones, tablets, laptops, and ultra-wide desktop monitors.
- **Zero-Dependency Bespoke UI**: Crafted using vanilla CSS variables, glassmorphic backdrop filters, and custom micro-animations without external UI library bloat.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | **React 19** | Component-driven declarative UI, modern hooks |
| **Build Tooling** | **Vite 7** | Sub-second HMR and optimized production bundling |
| **Styling & Design System** | **Vanilla CSS3** | Custom design tokens, glassmorphism, responsive grids |
| **Typography** | **Google Fonts** | *Outfit*, *Plus Jakarta Sans*, *Bebas Neue*, *Newsreader* |
| **Iconography** | **FontAwesome 7** | Scalable vector glyphs across all interactive elements |
| **HTTP Client** | **Axios** | Asynchronous REST API requests with timeout resilience |
| **News API** | **GNews API** | Real-time global headlines across 9 distinct categories |
| **Weather API** | **OpenWeatherMap** | Dynamic meteorological metrics and condition tracking |
| **Persistence** | **LocalStorage API** | Browser-level persistence for saved bookmarks and blogs |

---

## 🚀 Key Features

### 1. 📰 Breaking News & Categorized Feed
- **Hero Showcase**: Prominent breaking news card featuring high-resolution imagery, gradient scrim overlays, and an animated "LIVE EDITION" pulse indicator.
- **Multi-Category Navigation**: Instant topic filtering across **General**, **World**, **Business**, **Technology**, **Entertainment**, **Sports**, **Science**, **Health**, and **Nation**.
- **Live Search**: Debounced search query bar with instant submit and clear (`X`) functionality.
- **Article Reader Modal**: In-depth modal with reading time calculation, publication source badge, shareable link copier, and keyboard `Escape` support.

### 2. ✍️ Community Journal & Blog System
- **Publish Articles**: Built-in modal allowing readers to author custom posts with titles, categories, author credits, preset cover photos, and narrative content.
- **Local Persistence**: User posts immediately integrate into the feed and persist in browser storage.
- **Social Interactions**: Interactive like counters and post management.

### 3. ⛅ Real-Time Weather Widget
- **Dynamic Graphics**: Adaptive color gradients and glowing condition icons (Clear, Cloudy, Rainy, Stormy, Snowy, Hazy).
- **Secondary Metrics**: Live *Feels Like* temperature, *Humidity %*, and *Wind Speed*.
- **Quick-Switch Chips**: 1-click weather forecasts for major global hubs (*Mumbai, London, New York, Tokyo, Paris*).

### 4. 📅 Interactive Calendar
- **Smooth Navigation**: Previous and next month controls with automatic year transitions.
- **Quick-Jump**: Single-click "Today" button to immediately return to the active date.
- **Date State Tracking**: Glowing indigo-violet pill highlighting the active and selected dates.

### 5. 🔖 Reading List & Bookmark Drawer
- **Instant Save**: Save any news card or headline with a single click.
- **Slide-In Drawer**: Filter saved articles with search, inspect thumbnails, and open stories directly.

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chronicle-news-blog.git
   cd chronicle-news-blog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Lint and format code**:
   ```bash
   npm run lint
   ```

---

## 📂 Project Structure

```text
newsandblog/
├── public/                     # Static assets & favicon
├── src/
│   ├── assets/                 # Brand imagery and avatars
│   ├── Components/
│   │   ├── Blog.jsx            # Community blogging platform & modal
│   │   ├── blog.css            # Blog feed & creation modal styles
│   │   ├── Bookmark.jsx        # Saved reading list drawer & search
│   │   ├── bookmark.css        # Reading list styles
│   │   ├── Calender.jsx        # Interactive month/year calendar widget
│   │   ├── calender.css        # Calendar styles
│   │   ├── News.jsx            # Core layout, feed orchestration & hero
│   │   ├── news.css            # Responsive layout & card grid styles
│   │   ├── Newsmodel.jsx       # Modal story reader with share actions
│   │   ├── newsmodel.css       # Reader modal styles
│   │   ├── Wheather.jsx        # Meteorological widget with city search
│   │   └── wheather.css        # Glassmorphic weather styles
│   ├── App.jsx                 # Application entry container
│   ├── main.jsx                # DOM root mount & global icon imports
│   └── index.css               # Design system tokens & mesh background
├── index.html                  # HTML entry, SEO meta tags & Google Fonts
├── package.json                # Project dependencies and npm scripts
└── vite.config.js              # Vite bundler configuration
```

---

## 🌟 Portfolio Talking Points (Interview Ready)

When presenting this project in portfolio reviews or technical interviews, highlight:
1. **API Rate-Limit Resilience**: Designed graceful fallback datasets so third-party quota limits never degrade the user experience.
2. **Design System from Scratch**: Built a custom design system with CSS custom properties, fluid typography, and glassmorphism without heavy external frameworks.
3. **State Management**: Optimized local storage synchronization and eliminated unnecessary re-renders using modern React 19 lazy state initializers.
4. **Responsive Layouts**: Engineered a 3-column desktop layout that transforms into an intuitive single-column touch experience on mobile.

---

## 👤 Author

**Nirmal Solanki**
- GitHub: [Nirmal-Solanki8](https://github.com/Nirmal-Solanki8)
- LinkedIn: [Nirmal Solanki](https://linkedin.com/in/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
