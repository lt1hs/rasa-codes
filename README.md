# Rasa Codes

This is a comprehensive React project built with Vite, designed to showcase various features and functionalities, including an admin dashboard, content management, and interactive elements. The project emphasizes a modular architecture, clear separation of concerns, and a modern development stack.

## Project Structure

The project follows a well-organized structure to facilitate development and maintenance:

-   `public/`: Contains static assets such as images, fonts, and other media files.
-   `src/`: The core source code for the React application.
    -   `src/App.tsx`: The main application component.
    -   `src/main.tsx`: Entry point for the React application.
    -   `src/index.css`, `src/App.css`: Global and app-specific CSS.
    -   `src/assets/`: Static assets used within the source code (e.g., logos).
    -   `src/components/`: Reusable React components, categorized for clarity:
        -   `admin/`: Components specific to the admin dashboard (e.g., `ContentManager`, `UserManager`).
        -   `layout/`: Structural components defining the application's layout (e.g., `Header`, `Footer`, `AuthLayout`, `Layout`).
        -   `sections/`: Larger, page-section components (e.g., `HeroSection`, `AboutSection`, `FeaturesSection`).
        -   `signboard/`: Components related to the interactive signboard designer.
        -   `ui/`: Generic, reusable UI elements (e.g., `LoadingScreen`, `ModeSwitcher`, `ProjectCard`, `ServiceCard`, `OptimizedImage`).
    -   `src/contexts/`: React Context API implementations for global state management (e.g., `PerformanceContext`).
    -   `src/hooks/`: Custom React hooks for encapsulating reusable logic (e.g., `useInView`, `useOptimizedAnimation`).
    -   `src/pages/`: Top-level React components representing different routes/pages of the application:
        -   `AboutPage.tsx`
        -   `AdminDashboardPage.tsx`
        -   `BlogPage.tsx`
        -   `BlogPostPage.tsx`
        -   `ContactPage.tsx`
        -   `FeaturesPage.tsx`
        -   `GalleryPage.tsx`
        -   `LiteHomePage.tsx`
        -   `LoginPage.tsx`
        -   `PricingPage.tsx`
        -   `ProjectsPage.tsx`
        -   `SignBoardPage.tsx`
        -   `SignUpPage.tsx`
    -   `src/services/`: Modules for interacting with external APIs or backend services (e.g., `geminiService`, `huggingFaceService`).
    -   `src/styles/`: SCSS stylesheets, organized to mirror the component structure:
        -   `admin/`: Styles for admin dashboard components.
        -   Global styles and utility classes.
    -   `src/types/`: TypeScript type definitions for various data structures and props.
    -   `src/utils/`: General utility functions (e.g., `animations`, `imageOptimization`).

## Styling and Design System

The project utilizes a combination of **Tailwind CSS** for rapid UI development and utility-first styling, and **Sass (SCSS)** for more complex, component-specific styling and better organization.

-   **Tailwind CSS:** Used for responsive design, spacing, typography, colors, and general layout. Configuration is found in `tailwind.config.cjs`.
-   **Sass (SCSS):** Employed for modular, maintainable, and scalable stylesheets. Styles are organized within `src/styles/` with subdirectories for specific sections or components (e.g., `src/styles/admin/ContentManager.scss`). This allows for component-level styling and avoids global style conflicts.
-   **Design Principles:** The design aims for a clean, modern, and responsive user experience. Color palettes, typography, and spacing are consistently applied across the application.

## Key Pages and Their Purpose

-   **Home Page (`LiteHomePage.tsx` / `App.tsx`):** The main landing page, showcasing key features, services, and calls to action.
-   **About Page (`AboutPage.tsx`):** Provides information about the company, team, and mission.
-   **Features Page (`FeaturesPage.tsx`):** Details the various features offered by the product/service.
-   **Projects Page (`ProjectsPage.tsx`):** Displays a portfolio of completed projects.
-   **Blog Pages (`BlogPage.tsx`, `BlogPostPage.tsx`):** For articles and news, with a list view and individual post view.
-   **Contact Page (`ContactPage.tsx`):** Provides contact information and a contact form.
-   **Sign Board Page (`SignBoardPage.tsx`):** An interactive tool for designing custom signboards.
-   **Admin Dashboard (`AdminDashboardPage.tsx`):** A protected area for managing content, users, media, and settings.
    -   **Content Manager (`ContentManager.tsx`):** Manages website content (pages, posts, projects, products).
    -   **User Manager (`UserManager.tsx`):** Manages user accounts and roles.
    -   **Media Manager (`MediaManager.tsx`):** Handles media uploads and organization.
    -   **Settings Manager (`SettingsManager.tsx`):** Configures application settings.
-   **Authentication Pages (`LoginPage.tsx`, `SignUpPage.tsx`):** For user login and registration.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [repository-url] # Replace with your actual repository URL
    cd rasa-codes
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```

The application will typically be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

-   `npm run dev`: Starts the development server with hot-reloading.
-   `npm run build`: Compiles the application for production deployment.
-   `npm run lint`: Runs ESLint to check for code quality and style issues.
-   `npm run preview`: Serves the production build locally for testing.

## Technologies Used

-   **Frontend Framework:** React
-   **Build Tool:** Vite
-   **Language:** TypeScript
-   **Styling:** Sass (SCSS), Tailwind CSS
-   **Linting:** ESLint
-   **Code Formatting:** Prettier (assumed based on common practices)
-   **State Management:** React Context API (for certain global states)
-   **Routing:** React Router (assumed for navigation between pages)
-   **API Interaction:** Fetch API or Axios (depending on implementation in `src/services`)

This detailed `README.md` should provide sufficient context for AI tools to understand the project's architecture, design choices, and content.
