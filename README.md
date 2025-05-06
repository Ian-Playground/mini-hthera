# Mini-Healthera

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
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   ├── lib/         # Utility functions
│   ├── store/       # Zustand store
│   └── types/       # TypeScript types
├── .eslintrc.json   # ESLint configuration
├── .prettierrc      # Prettier configuration
├── .prettierignore  # Prettier ignore rules
├── .gitignore       # Git ignore rules
├── .gitattributes   # Git attributes
├── package.json     # Project dependencies
├── tsconfig.json    # TypeScript configuration
└── README.md        # Project documentation
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
