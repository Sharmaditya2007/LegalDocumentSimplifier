# LegalEase AI — Legal Document Intelligence Platform

> **Understand, analyze, compare, and interact with legal agreements in plain English.**  
> Built like DocuSign AI, Harvey AI, and Ironclad.

---

## ⚡ Overview

Most people and founders struggle with legal contracts because they are written in dense, impenetrable legalese. **LegalEase AI** is an AI-powered SaaS platform designed to:

* **Deconstruct Legal Language**: Automatically translate legalese into conversational, plain English.
* **Flag Predatory Risks**: Detect 100% early termination penalties, hidden auto-renewals with fee hikes, unilateral indemnification, liability caps, and non-compete covenants.
* **Side-by-Side Semantic Contract Comparison**: Upload two revisions of an agreement to see added clauses, removed rights, modified financial terms, and risk delta scores.
* **Contextual Conversational Copilot**: Ask specific questions ("What are my obligations if we terminate early?", "Are there hidden fees?") and receive precise answers with verified document citations.
* **Obligation & Deadline Sentinel**: Extract payment due dates, notice windows, and expiration dates into an interactive cross-document timeline.
* **Enterprise Control Plane**: Role-based access control (User, Premium Lawyer, Admin), user quota management, and platform contract audit.

---

## 🏗️ Architecture & Tech Stack

### Frontend (`/client`)
* **React 18** with **Vite**
* **Tailwind CSS** with dark/light mode and glassmorphism styling
* **Framer Motion** for smooth UI transitions
* **Chart.js & react-chartjs-2** for risk distribution and volume analytics
* **Lucide React** for modern enterprise iconography
* **Axios** with automatic JWT Bearer token injection
* **React Router DOM 6** with route protection and role-based guards

### Backend (`/server`)
* **Node.js & Express.js**
* **Dual AI Engine Architecture**:
  - **OpenAI GPT-4o-mini / GPT-3.5 API** integration when `OPENAI_API_KEY` is provided.
  - **Built-in High-Accuracy Legal Intelligence NLP Engine** fallback that ensures 100% reliable offline/demo operations out of the box with zero external dependencies required!
* **Multi-Format Ingestion**: `pdf-parse` for digital PDFs, OCR layer representation, `mammoth` for DOCX/Word files, and text streams for TXT/Markdown.
* **Security Layer**: `helmet`, `cors`, `express-rate-limit`, bcrypt password hashing, and signed JWT authentication.
* **Zero-Config Storage**: Pre-seeded JSON local store with pre-loaded enterprise contracts + seamless MongoDB Atlas Mongoose schema compatibility.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js** (v18 or newer recommended, tested on v24)
* **npm**

### 2. Clone & Install
```bash
# Clone the repository
git clone <repo-url>
cd "Ai legal document"

# Install both backend and frontend dependencies
npm run install:all
```

### 3. Run Development Servers
Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
npm run dev:server
# Server starts at http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
# Vite client starts at http://localhost:5173
```

---

## 🔑 Pre-Configured Demo Accounts (1-Click Login)

The platform includes pre-seeded demo accounts with sample contracts ready for instant evaluation:

| Role | Email | Password | Pre-loaded Contracts |
|---|---|---|---|
| **Standard User** | `user@legalease.ai` | `password123` | CloudScale SaaS MSA, Mutual NDA, Employment v1 & v2 |
| **Premium Lawyer (Pro)** | `premium@legalease.ai` | `password123` | High-risk vendor & M&A contracts |
| **Admin Console** | `admin@legalease.ai` | `password123` | Full user management & audit access |

*(You can also click the quick **"Standard"**, **"Lawyer (Pro)"**, or **"Admin"** buttons on the Login page for 1-click access!)*

---

## 📄 Key Workspaces & Capabilities

### 1. Landing Page (`/`)
* Modern dark/light glassmorphic SaaS interface.
* **Interactive Live Sandbox**: Test predatory clause translation (100% termination penalty, auto-renewal fee hikes, unilateral indemnity) right on the landing page before logging in.
* Pricing table with Monthly/Yearly toggle, feature comparison, customer testimonials, and interactive FAQ accordion.

### 2. Executive Dashboard (`/dashboard`)
* High-level KPI metrics (Total Documents, High Risk Contracts, Pending Deadlines).
* Chart.js Risk Distribution Doughnut & Monthly Audit Activity Bar Chart.
* 1-Click Sample Contract loaders (`SaaS MSA`, `Mutual NDA`, `CTO Agreement`) for instantaneous testing.
* Drag-and-drop contract uploader supporting PDF, DOCX, and TXT.

### 3. Document Analysis Workspace (`/documents/:id`)
* Overall Risk Score Gauge (e.g. `78/100 HIGH RISK`).
* Tabbed views:
  1. **Plain-English & Summary**: Conversational translation and executive legal summary.
  2. **Risk Sentinel Engine**: Detailed breakdown of unfair penalties, liability transfer, and predatory terms with exact clause references and recommended redlines.
  3. **Important Clauses**: Section-by-section breakdown.
  4. **Obligations & Duties**: Table of binding covenants per party.
  5. **Critical Deadlines Timeline**: Notice windows and payment dates.
  6. **Original Extracted Text**: Verbatim text viewer with keyword search.
* Downloadable audit report in `.txt` format.

### 4. Contract Comparison Workspace (`/compare`)
* Side-by-side clause alignment between Contract A and Contract B.
* Semantic diff metrics: Clauses Added, Clauses Removed, Clauses Modified, and Risk Delta score.
* Visual color-coded diff boxes (Green = favorable compensation changes, Red = newly introduced restrictive covenants/non-competes).

### 5. AI Document Chat Workspace (`/chat`)
* Contextual Q&A strictly grounded in the selected document.
* One-click suggested questions ("What happens if I terminate early?", "Are there hidden fees?").
* Verified document citations for every AI response.

### 6. Obligation & Deadline Timeline (`/timeline`)
* Cross-contract chronological schedule of expiration dates, 60-day renewal notice cutoff windows, and payment milestones.

### 7. Admin Intelligence Console (`/admin`)
* User management: View registered users, update roles (`user`, `premium`, `admin`), modify subscription tiers (`free`, `pro`, `enterprise`), and block/unblock accounts.
* System analytics, token monitor, and engine status check.

---

## 🛡️ Security & Privacy
* **Zero Data Retention Model**: Prompts and uploaded contracts are never used to train external public foundation models.
* **Role-Based Access Control**: Strict JWT middleware verification for all protected routes.
* **Rate Limiting**: 300 requests per 15-minute window via `express-rate-limit`.
* **Input Sanitization**: Multer file type and size validation (25MB limit), XSS safeguards, and Helmet HTTP security headers.
