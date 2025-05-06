# Mini-Hthera

A modern prescription management system built with Next.js 15, TypeScript, and Material-UI.

## Features

- 📱 Modern, responsive UI with Material-UI
- 🔒 Type-safe development with TypeScript
- 🎨 Consistent code style with Prettier
- 🚨 Code quality with ESLint
- 🧪 Testing setup with Jest
- 📦 Package management with Yarn
- 🏗️ State management with Zustand
- 🔄 Git hooks with Husky
- ♿ Accessibility compliance with WCAG 2.1
- 🔍 Prescription search and filtering

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ian-Playground/mini-hthera.git
   cd mini-hthera
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🧱 Brief Explanation of Architecture Decisions

The Mini-Hthera project was intentionally designed to balance **developer experience**, **code scalability**, and **long-term maintainability**, while keeping the implementation lean for the assessment scope. Here's a breakdown of the architectural decisions:

- **Feature-centric file structure**: Organized using domain-driven design (DDD) principles. Each domain (`prescription`) owns its models, API abstraction, and state management logic under `entities/`, improving encapsulation and scalability.

- **Next.js 15 (App Router)**: Chosen for its modern routing approach, built-in layout and server component support, and future-readiness. The app uses client components where interactivity is needed but keeps logic isolated from views.

- **Material-UI**: Selected for accessible, production-grade components out of the box. It accelerates UI development while staying WCAG-compliant.

- **Zustand for state management**: A lightweight and modular state store, avoiding unnecessary boilerplate. It complements the React mental model and is easier to test and scale compared to heavier options like Redux.

- **Mock API abstraction (`entities/prescription/api/`)**: Even though data is hardcoded, the API layer mimics real-world service calls and shapes. This allows seamless swap-in with REST or GraphQL endpoints later, reducing future refactoring risk.

- **Type safety everywhere**: All data is strictly typed using TypeScript, and schema validation with `zod` can easily be introduced to enforce runtime safety.

- **Accessibility baked in**: Components and interactions follow WCAG 2.1 guidelines from the ground up — semantic HTML, ARIA roles, focus management, and contrast compliance are prioritized early.

### 📈 Performance & Accessibility Audit

This app was tested using [Lighthouse](https://developers.google.com/web/tools/lighthouse). Below is the result:

**Scores:**

- Performance: 100
- Accessibility: 95
- Best Practices: 96
- SEO: 100

## Development

### Code Style

This project uses Prettier and ESLint for code formatting and linting. The configuration is set up to:

- Use 2 spaces for indentation
- Use single quotes
- Enforce semicolons
- Set max line length to 100 characters
- Use trailing commas in objects and arrays
- Use LF line endings

VS Code settings are configured to:

- Format on save
- Use Prettier as the default formatter
- Run ESLint fixes on save

### Import Conventions

Imports are organized in the following order with comments:

```typescript
// Import core react modules
import { useState, useEffect } from 'react';

// Import external modules and libraries i.e.: Lodash, MUI, etc.
import { Box, Typography } from '@mui/material';
import debounce from 'lodash/debounce';

// Import store
import { usePrescriptionStore } from '@/entities/prescription/model/usePrescriptionStore';

// Import internal components
import { Layout } from '@/shared/components/Layout';

// Import styles
import './styles.css';
```

### Git Workflow

1. **Branch Naming**

   - Feature branches: `feature/*`
   - Bug fixes: `bugfix/*`
   - Hotfixes: `hotfix/*`

2. **Commit Messages**
   Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

   ```
   type(scope): description
   ```

   Types:

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes
   - `refactor`: Code refactoring
   - `test`: Adding or modifying tests
   - `chore`: Maintenance tasks

3. **Pre-commit Hooks**
   - Runs ESLint
   - Runs Prettier
   - Type checking

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run tests
- `yarn test:coverage` - Run tests with coverage
- `yarn clean` - Clean dependencies and build files
- `yarn upgrade-interactive` - Interactive dependency updates

### Project Structure

```
mini-hthera/
├── .github/           # GitHub workflows and templates
├── .husky/           # Git hooks
├── .vscode/          # VS Code settings
├── public/           # Static files
├── src/
│   ├── app/                    # Next.js app directory
│   │   └── prescriptions/     # Prescription feature pages
│   ├── entities/              # Domain entities
│   │   └── prescription/      # Prescription domain
│   │       ├── api/          # API interfaces and implementations
│   │       ├── model/        # State management
│   │       └── types/        # TypeScript types
│   └── shared/               # Shared components and utilities
│       ├── components/       # Reusable components
│       └── mocks/           # Mock data
├── .eslintrc.json   # ESLint configuration
├── .prettierrc      # Prettier configuration
├── .prettierignore  # Prettier ignore rules
├── .gitignore       # Git ignore rules
├── .gitattributes   # Git attributes
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript configuration
└── README.md        # Project documentation
```

### Accessibility

The application follows WCAG 2.1 guidelines and includes:

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Skip links
- Color contrast compliance
- Screen reader support

---

## 🚀 Real-World Extension

In a production environment, this application would evolve into a secure, scalable, and maintainable prescription management system. Here’s how I’d approach it based on prior experience leading large engineering teams:

#### 🧩 Hosting, Infrastructure, Backend & Data

- Replace the mock API with real REST or GraphQL services, integrated using **SWR** or **React Query** for caching, retries, and background revalidation.
- Persist prescription and refill data using **PostgreSQL** and **Prisma** (or **Drizzle**) for type-safe database access.
- Deploy on Vercel or using AWS Amplify.
- Add **authentication** (e.g., JWT or OAuth via Clerk/Auth0) and **role-based access control** (patients, pharmacists, admins).
- Extend the domain model to include **audit trails**, **status history**, and **prescription attachments**.

#### 🧠 Domain / Business Logic

- Implement business rules such as **cooldown periods**, **refill expiry**, or **dosage warnings**.
- Enable **prescription lifecycle tracking** (e.g., requested → approved → fulfilled) with status indicators.
- Introduce **notifications** (in-app and email) for refills due soon, doctor actions, or changes.

#### 👥 Team Productivity, Maintainability & Quality

- Enforce domain encapsulation through clearly defined `entities/`, shared utilities, and decoupled state.
- Promote **design system reuse** via shared, well-tested UI components and accessibility wrappers.
- Scale the codebase with **atomic commits**, **feature flags**, and **environment-based configurations**.
- Drive code quality via:
  - Pre-commit hooks (ESLint, Prettier, type-checking)
  - Testing layers (unit with Jest, integration with React Testing Library, E2E with Playwright)
  - GitHub Actions CI with test + lint gates and preview deploys

#### 🌐 Internationalization & Compliance

- Add **i18n support** using `next-intl` or `react-i18next`, starting with UI labels and later extending to server messages.
- Ensure **GDPR and HIPAA compliance** with secure audit logs, encryption-at-rest (PostgreSQL), and token-based file access.
- Integrate **analytics and monitoring** with Sentry, LogRocket, and backend observability via Prometheus + Grafana.

This architecture is designed not just to ship features, but to support **fast iteration**, **shared ownership**, and **long-term resilience** in a multi-team setting.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
