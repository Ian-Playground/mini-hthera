# Contributing to Healthera

Thank you for your interest in contributing to Healthera! This document provides guidelines and instructions for contributing.

## Development Workflow

### 1. Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mini-hthera.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up pre-commit hooks:
   ```bash
   npm run prepare
   ```

### 2. Branching Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `hotfix/*` - Urgent production fixes

### 3. Making Changes

1. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Run tests and checks:

   ```bash
   npm run lint
   npm run type-check
   ```

4. Commit your changes:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

### 4. Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `perf:` - Performance improvements
- `test:` - Adding or modifying tests
- `chore:` - Changes to build process or auxiliary tools

Example:

```
feat: add prescription search functionality
fix: resolve type error in prescription store
docs: update README with new features
```

### 5. Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run format` to format your code
- Run `npm run lint` to check for linting issues

### 6. Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Maintain or improve test coverage

### 7. Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update the README.md if needed
5. The PR will be reviewed by maintainers

### 8. Review Process

- All PRs require at least one review
- Address review comments promptly
- Keep PRs focused and small
- Squash commits before merging

### 9. Getting Help

- Open an issue for bugs
- Use discussions for questions
- Join our community chat

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the project's license.
