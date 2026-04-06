# Refactor to Template + CMS Architecture (Analysis Phase)

## Goal

Analyse the existing codebase and produce a complete, implementation-ready refactor plan that:

- Eliminates duplication across pages
- Introduces reusable, template-driven architecture
- Moves all content into structured `/content` files
- Prepares the system for seamless TinaCMS integration
- Preserves all current functionality and visual output

---

## Critical Context (Must Be Respected)

This is a real, existing codebase.

You MUST:

- Base all decisions on actual files and patterns in the repo
- NOT assume ideal structure — derive it from what exists
- NOT invent components or patterns without justification

If required information is missing:

- Explicitly state what is missing
- DO NOT infer or guess

---

## Priority Order (Optimisation Goals)

You must optimise for:

1. Eliminate duplication
2. Ensure TinaCMS compatibility
3. Preserve current UI/UX exactly
4. Improve maintainability
5. Minimise complexity (avoid over-engineering)

---

## Non-Negotiable Rules

1. No content inside React components
2. All content must live in `/content`
3. Pages must be template-driven
4. Use `[slug]` dynamic routes for repeatable content
5. All dynamic routes must use `generateStaticParams`
6. Content must be TinaCMS-compatible

---

## Required Working Method (Follow Strictly)

You MUST work step-by-step:

1. Scan and understand the repository
2. Identify duplication and patterns
3. Extract reusable structures
4. Define data models
5. Design templates
6. Design routing
7. Design CMS schema

DO NOT skip steps or jump ahead.

---

## Required Analysis Tasks

### 1. Duplication Audit

- Identify duplicated structures across pages
- Focus on:
  - `/accommodation/*`
  - `/adventures/*`

Break duplication into:

- Layout structure
- UI sections
- Data patterns

Include explicit file references.

---

### 2. Component Reuse Strategy

Evaluate all existing components:

For each, classify as:

- Reuse as-is
- Refactor
- Remove

DO NOT duplicate functionality already present.

---

### 3. Template System Design

Define:

- `AccommodationPageTemplate`
- `AdventurePageTemplate`

For each template include:

- TypeScript props interface
- Required data structure
- Section layout (ordered)
- Mapping to existing components

Templates must be:

- Reusable
- Minimal
- Composable

---

### 4. Content Model Design (MANDATORY)

Define full TypeScript interfaces for:

- Accommodation
- Adventures
- Facilities
- Navigation (if needed)

Each must include:

- Required fields
- Optional fields
- Nested structures

Content must fully replace all hardcoded data.

---

### 5. Content Folder Structure

Define `/content` layout:

- Folder hierarchy
- File naming rules
- Slug mapping

Explain clearly how content maps to routes.

---

### 6. Dynamic Routing Strategy

Define:

- `[slug]` route structure
- Data loading mechanism
- `generateStaticParams` implementation
- Missing content handling

---

### 7. TinaCMS Schema Design

Define a real schema:

- Collections
- Fields
- Field types
- Mapping to content files

Schema must match content models exactly.

---

### 8. API Review

Analyse `/api/gallery`:

- Identify duplication or inefficiencies
- Suggest reusable utilities
- Ensure compatibility with new structure

---

### 9. Architecture Violations

Identify all violations of target rules:

- Hardcoded content
- Inline data
- Duplicated layouts

Include file references.

---

### 10. Migration Plan (Step-by-Step)

Provide a safe execution plan:

- Order of changes
- Dependency sequencing
- Risk mitigation
- How to avoid breaking routes

---

## Success Criteria (Must Be Verified)

- No hardcoded content in pages
- All repeatable pages use `[slug]`
- All content in `/content`
- Templates replace duplicated layouts
- TinaCMS schema matches content exactly
- UI/UX remains unchanged

---

## Validation Requirement (MANDATORY)

Before finalising:

- Verify ALL success criteria are met
- Explicitly confirm this in the output
- If any are not met, revise the plan

---

## Constraints

- DO NOT modify code
- DO NOT generate diffs
- DO NOT generate implementation
- ONLY produce the plan

---

## Output

Generate:

`refactor_plan.md`

It must include:

1. Duplication report
2. Component strategy
3. Template design
4. Content models
5. Content structure
6. Routing strategy
7. TinaCMS schema
8. API review
9. Violations report
10. Migration plan
11. Risks

---

## Important

- Be specific and concrete
- Use real repo examples
- Do not guess
- Prefer simple solutions over complex ones
