# Exoria Next.js Project

This project is a modern web application for **Exoria Serana Digital**, a digital solutions provider. It is built with Next.js and features a robust admin panel, user authentication, and product management.

## Project Overview

- **Purpose:** Digital solutions platform, portfolio showcase, and product sales/management.
- **Main Technologies:**
    - **Framework:** Next.js 16 (App Router)
    - **Language:** TypeScript
    - **Styling:** Tailwind CSS 4, Shadcn UI
    - **Database:** Prisma ORM with PostgreSQL
    - **Authentication:** NextAuth.js (Credentials Provider)
    - **State Management:** TanStack Query (React Query)
    - **Form Management:** React Hook Form + Zod validation
    - **Icons:** Lucide React

## Architecture & Structure

The project follows a standard Next.js App Router structure with logical groupings for routes and components:

- `src/app`: Contains all routes.
    - `(admin)`: Admin-only pages (products, users).
    - `(authentication)`: Sign-in and sign-up pages.
    - `(user)`: Public and user-facing pages (portfolio, products, etc.).
    - `api`: Backend API routes for products and users.
- `src/components`: Reusable UI components.
    - `ui`: Base Shadcn UI components.
    - Feature-based folders: `admin`, `auth`, `homepage`, `layouts`.
- `src/lib`: Utility functions and library initializations (Prisma client, Auth options).
- `src/schemas`: Zod schemas for form validation and data integrity.
- `prisma`: Database schema definition and migration scripts.

## Building and Running

### Development
```bash
npm install
npm run dev
```

### Database Management
- **Generate Prisma Client:** `npx prisma generate`
- **Push Schema Changes:** `npx prisma db push`
- **Migration:** `npm run migrate` (runs `prisma migrate dev --name init`)
- **Seeding:** `npx prisma db seed`

### Production
```bash
npm run build
npm run start
```

## Development Conventions

- **Type Safety:** Use TypeScript for all components and logic. Leverage Zod schemas in `src/schemas` for both frontend validation and backend API validation.
- **UI Components:** Prefer reusing components from `src/components/ui` (Shadcn UI). Use Tailwind CSS for custom styling.
- **API Interactions:** Use Axios for HTTP requests and TanStack Query for data fetching/caching.
- **Authentication:** Authentication is handled via NextAuth. User roles are defined as `ADMIN` and `USER`. Protect admin routes by checking the user's role in the session.
- **File Naming:** Use PascalCase for components (`MyComponent.tsx`) and kebab-case for routes/files where appropriate.

## Key Data Models (Prisma)

- **User:** Manages authentication, roles (`ADMIN`, `USER`), and subscription status.
- **Product:** Stores digital product details including price, image URL, and a drive link for delivery.
