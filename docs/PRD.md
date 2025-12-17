# Product Requirements Document (PRD): Lore

**Version:** 1.0 (Hybrid Stack)
**Status:** Approved
**Date:** December 17, 2025
**Target Launch:** Q2 2026

---

## 1. Executive Summary
**Lore** is an AI-powered platform that helps families and communities preserve their stories, visualize relationships, and connect across generations. Unlike traditional genealogy tools which are data-heavy and dry, Lore focuses on the *emotional* connection—visual storytelling, semantic discovery, and beautiful artifact presentation.

* **Core Value:** Combining structured archival data (Family Trees) with unstructured emotional content (Stories/Photos) via AI.
* **Target Audience:** Family Archivists (Primary) and Community Leaders.

---

## 2. User Personas & Roles

### 2.1 Personas
* **The Archivist (Sarah, 45):** Deeply invested. Wants accurate trees and safe storage. Willing to pay for organization.
* **The Contributor (Emily, 32):** Casual. Wants a "social media" experience. Will post if it's easy; won't post if it feels like homework.

### 2.2 Permissions (RBAC via RLS)
| Role | Tree Mgmt | Content Posting | Invite Members | Billing/Delete |
| :--- | :---: | :---: | :---: | :---: |
| **Owner** | ✅ | ✅ | ✅ | ✅ |
| **Admin** | ✅ | ✅ | ✅ | ❌ |
| **Editor** | ✅ | ✅ | ❌ | ❌ |
| **Member** | ❌ | ✅ | ❌ | ❌ |
| **Viewer** | ❌ | ❌ | ❌ | ❌ |

---

## 3. Functional Requirements (MVP)

### 3.1 Authentication & Onboarding
* **Provider:** Supabase Auth (Email/Pass + Google OAuth).
* **Flow:** Sign Up -> Email Verify -> Profile Setup -> Create/Join Community.

### 3.2 The Visual Family Tree (Core)
* **Interface:** Interactive, drag-and-drop canvas using **React Flow**.
* **Logic:** Directed Acyclic Graph (DAG) visualized as a tree.
* **Interactions:** Click node to view profile; Drag node to re-parent; Pinch-to-zoom.

### 3.3 The Timeline Feed (Social)
* **Layout:** Masonry grid (Pinterest-style) mixed with chronological milestones.
* **Content:** Images, Videos, Text, Audio.
* **Engagement:** Comments and Reactions.

### 3.4 Hybrid AI Engine (Passive & Vector)
* **Auto-Tagging (Passive):** On upload, Edge Functions extract EXIF data (Date/Loc) and use Vision AI to tag scenes (e.g., "Wedding," "Beach").
* **Semantic Search (Vector):** All text descriptions and image captions are embedded using `pgvector`. Users can search by *concept* (e.g., "Joyful summer days") rather than just keywords.

---

## 4. Technical Architecture (The Hybrid Stack)

### 4.1 Core Stack
* **Frontend:** Next.js 14+ (App Router) + TypeScript.
* **Styling:** Tailwind CSS + shadcn/ui.
* **Backend:** Supabase (Managed Postgres).
* **AI/Vector:** Supabase `pgvector` extension + OpenAI Embeddings.
* **Storage:** Supabase Storage (Buckets: `avatars`, `memories`).

### 4.2 Data Strategy
* **Graph Data:** We use **PostgreSQL Recursive CTEs** (Common Table Expressions) to handle tree traversals. This avoids the need for a separate Graph DB (like Neo4j) for the MVP.
* **Vector Data:** Embeddings are stored directly alongside content in Postgres, enabling "Hybrid Search" (Keyword + Semantic).

### 4.3 Database Schema (High-Level)

```sql
-- Communities (Tenants)
TABLE communities (
  id UUID PRIMARY KEY,
  name TEXT,
  plan TEXT DEFAULT 'free' -- 'free', 'personal', 'family'
);

-- People (Graph Nodes)
TABLE people (
  id UUID PRIMARY KEY,
  community_id UUID REFERENCES communities,
  first_name TEXT,
  last_name TEXT,
  birth_date DATE,
  metadata JSONB
);

-- Relationships (Graph Edges)
TABLE relationships (
  id UUID PRIMARY KEY,
  from_person_id UUID REFERENCES people,
  to_person_id UUID REFERENCES people,
  type TEXT -- 'parent', 'spouse', 'child'
);

-- Memories (Content + Vectors)
TABLE memories (
  id UUID PRIMARY KEY,
  community_id UUID,
  description TEXT,
  embedding VECTOR(1536) -- For Semantic Search
);