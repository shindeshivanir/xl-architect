# 🟢 XL-ARCHITECT: World Class Excel Intelligence

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini--AI-8E43E7?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

**XL-Architect** is an intelligent, high-performance, and beautifully designed productivity suite built for Excel power-users and spreadsheet engineers. By combining cutting-edge LLMs (Google Gemini) with seamless client-side generation, XL-Architect deconstructs, constructs, and accelerates spreadsheet intelligence in real-time.

---

## 🚀 Key Modules & Features

### 1. 🏗️ AI Excel Architect
* **Natural Language to Logic:** Describe your business goals (e.g., *"How do I look up sales from Q1 and join them with the active employee registry?"*) and receive clean, optimized Excel formulas.
* **Modern Array Focus:** Prioritizes high-efficiency "New Excel" structures (`XLOOKUP`, `FILTER`, `UNIQUE`, `LET`) over nested legacy operations.
* **Pro-Level Solutions:** Accompanied by step-by-step UI navigation instructions, specific MacOS/Windows shortcuts, performance pro-tips, and layout design guides.

### 2. 🐛 Interactive Formula Debugger
* **Step-by-Step Breakdown:** Paste complex, nested formulas to deconstruct their architecture.
* **Semantic Tokenization:** Classifies and highlights elements by role:
  * ⏹️ **Functions** (e.g., `INDEX`, `MATCH`)
  * 🔀 **Parameters** (arguments passed to functions)
  * ➕ **Operators** (logical comparison, arithmetic, concatenation)
  * 🧭 **Cell References** (e.g., `$A$1:C20`, relative/absolute offsets)
  * 📝 **Constants** (strings or numerical values)
* **Error Prevention:** Performs automated diagnostics, alerts users to common pitfalls (e.g., circular references, `#N/A`, `#VALUE!`), and suggests formula optimizations.

### 3. 🎨 Conditional Formatting Guide (Logic & Style)
* **Styling Rules Generator:** Describe visual patterns (e.g., *"Highlight cells in red where the current date has passed the deadline and payment status is pending"*).
* **Implementation Maps:** Provides custom logic formulas along with precise menu paths and color contrast guidelines for clean, professional data presentation.

### 4. ⌨️ Smart Shortcut Repository
* **Multi-Platform Map:** Swap between **macOS** and **Windows** shortcuts with a single click.
* **Universal Search:** Instant filtering across multiple categories:
  * 📂 File Management
  * 🧭 Navigation
  * 🔢 Formatting
  * 🧮 Advanced Formulas & Data Management
  * 📊 Editing & Selections

### 5. 📂 Visual Setup Templates
* **Pre-engineered Structures:** Access saved visual blueprint templates for key spreadsheet architectures (Dashboards, Trend Analysis, Pivot preparation, charts, etc.).
* **One-Click Export:** Download instructions and baseline data structures to quickly build advanced templates.

### 6. 📥 Direct XLSX Spreadsheet Export
* **SheetJS Integration:** All generated formulas and visual templates can be compiled into `.xlsx` workbook downloads at the click of a button.
* **Instant Clipboard Copy:** Click-to-copy utility across all code fragments.

### 7. 📱 Mobile-First and Adaptive Design
* **Hamburger Menu Navigation:** Features a clean drawer layout fully optimized for mobile devices and tablets, fixing header truncation and mobile viewing gaps.
* **Responsive Modals:** Redesigned responsive dialog boxes that adapt beautifully from small smartphone screens to ultra-wide desktop monitors.
* **Dual-Theme Support:** Beautiful, sleek Light Theme and a high-contrast Slate/Dark Theme.

---

## 🛠️ Tech Stack & Libraries

* **Framework:** React 19 + Vite 6 (configured for lightning-fast bundling)
* **Language:** TypeScript (configured for strict type safety and structured models)
* **Styling:** Tailwind CSS v4 + custom `@theme` utilities
* **Animations:** Framer Motion (using native `motion/react` with `AnimatePresence` and custom physics layouts)
* **Spreadsheet Engine:** SheetJS (`xlsx` engine for client-side blob generation)
* **AI Orchestration:** `@google/genai` (utilizing `gemini-3-flash-preview` for high-throughput JSON Schema execution)
* **Icons:** `lucide-react` (comprehensive vector icon pack)

---

## 📦 Directory Structure

```bash
├── src/
│   ├── main.tsx           # React bootstrap entrypoint
│   ├── App.tsx            # Main shell, responsive navigation, and tab views
│   ├── index.css          # Tailwind CSS global entrypoint
│   ├── components/        # Extracted UI components
│   │   ├── Common.tsx           # Shared components (ModalOverlay, CopyButton, etc.)
│   │   ├── FormulaDebugger.tsx  # Step-by-step formula tokenization & analyzer
│   │   ├── FormattingGuide.tsx  # Conditional formatting generator
│   │   ├── SavedTemplates.tsx   # Curated visual structures & guides
│   │   └── ShortcutGuide.tsx    # Interactive searchable OS-toggled shortcuts
│   ├── data/              # Static dataset guides and shortcuts mapping
│   ├── lib/               # Custom helper libraries
│   │   └── excelExport.ts       # SheetJS-powered xlsx browser downloader
│   └── services/          # Gemini AI API services & JSON interfaces
│       └── gemini.ts            # Schema configuration for Gemini API
├── package.json           # Bundler scripts and package dependencies
├── metadata.json          # Applet configurations
└── vite.config.ts         # Vite compilation plugins and configuration
```

---

## 💻 Local Setup & Development

To run **XL-Architect** on your local machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ is recommended).

### 2. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/xl-architect.git
cd xl-architect

# Install dependencies
npm install
```

### 3. Configure API Keys
To power the formula architect, debugger, and formatting features, you need a **Gemini API Key**.
Create a `.env` file in the root folder:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> Get a free API key instantly at [Google AI Studio](https://aistudio.google.com/).

### 4. Start Development Server
```bash
npm run dev
```
The server will boot locally. Open your browser and navigate to the address shown in the terminal (typically `http://localhost:3000`).

### 5. Build for Production
To package the app for production (optimized build placed in the `dist` folder):
```bash
npm run build
```

---

## 🛡️ License

This project is open source and available under the [MIT License](LICENSE).

Developed with precision and design-centric detail by **XL-Architect UI & AI Teams**. Feel free to star ⭐️ the repository if you find it helpful!
