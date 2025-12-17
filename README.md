# Lore 🌳

> **Preserve stories. Connect generations. Visualize history.**

Lore is an AI-powered archiving platform that bridges the gap between rigid genealogy tools and ephemeral social media. It allows families and communities to build interactive family trees, share multimedia stories, and discover connections through semantic search.

![Status](https://img.shields.io/badge/Status-Pre--Alpha-orange)
![Stack](https://img.shields.io/badge/Stack-Next.js_14-black)
![Database](https://img.shields.io/badge/DB-Supabase_%2B_pgvector-green)

---

## 🚀 The Hybrid Tech Stack

Lore utilizes a "Hybrid Revolutionary" architecture designed for speed, scalability, and AI-native capabilities.

* **Frontend:** [Next.js 14](https://nextjs.org/) (App Router, Server Components)
* **Language:** TypeScript
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
* **Backend & Auth:** [Supabase](https://supabase.com/)
* **Database:** PostgreSQL
    * **Graph Logic:** Recursive CTEs (Common Table Expressions) for tree traversal.
    * **AI Search:** `pgvector` for vector embeddings and semantic search.
* **Visuals:** [React Flow](https://reactflow.dev/) for interactive family trees.
* **AI:** OpenAI / Anthropic via Edge Functions.

---

## ✨ Key Features (MVP)

1.  **Visual Family Tree:** Interactive, drag-and-drop canvas to map relationships.
2.  **Smart Timeline:** A Pinterest-style feed of photos, videos, and stories.
3.  **Passive AI:** Automatically extracts dates, locations, and scene descriptions from uploaded photos.
4.  **Semantic Search:** Search for *"Grandma cooking in the summer"* and find photos that match the *vibe*, not just the tags.
5.  **Secure Communities:** Role-Based Access Control (RBAC) allows granular privacy (Owner, Editor, Viewer).

---

## 🛠️ Getting Started

### Prerequisites
* Node.js 18+
* npm or pnpm
* A Supabase Project (Free Tier works)

### Installation

1.  **Clone the repo**
    ```bash
    git clone [https://github.com/yourusername/lore.git](https://github.com/yourusername/lore.git)
    cd lore
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Setup**
    Copy the example environment file:
    ```bash
    cp .env.example .env.local
    ```
    Fill in your Supabase credentials in `.env.local`:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    OPENAI_API_KEY=your_openai_key
    ```

4.  **Database Migration**
    Run the Supabase migrations to set up the schema and RLS policies:
    ```bash
    npx supabase db push
    ```

5.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 📂 Project Structure

```bash
/src
  /app          # Next.js App Router pages
  /components   # React components (shadcn/ui)
  /lib          # Utilities, Supabase client, formatting helpers
  /types        # TypeScript interfaces (generated from DB)
/supabase
  /migrations   # SQL migration files
  /functions    # Edge Functions (AI logic)