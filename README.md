# Mini-Hthera

A modern prescription management system built with Next.js 15, TypeScript, and Material-UI.

## Features

- 📱 Modern, responsive UI with Material-UI
- 🔒 Type-safe development with TypeScript
- 🎨 Consistent code style with Prettier
- 🚨 Code quality with ESLint
- 🧪 Testing setup with Jest
- 📦 Package management with Yarn
- 🔄 Git hooks with Husky
- 🎯 Conventional commits
- ♿ Accessibility compliance with WCAG 2.1
- 🔍 Prescription search and filtering
- 📋 Prescription history tracking
- 💊 Refill request management

## Prerequisites

- Node.js >= 18.0.0
- Yarn >= 1.22.0

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mini-hthera.git
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

### CSS Conventions

We use BEM (Block Element Modifier) methodology for CSS class names:

```css
.block {
}
.block__element {
}
.block__element--modifier {
}
```

Example:

```css
.prescriptions {
}
.prescriptions__header {
}
.prescriptions__search {
}
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

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
