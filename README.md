# Healthera Prescription Management

A modern, scalable prescription management application built with Next.js 15, Material-UI, and Zustand.

## Features

- View list of prescriptions with search functionality
- View detailed prescription information
- Request prescription refills
- Responsive design
- Accessible UI components

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** Material-UI (MUI)
- **State Management:** Zustand
- **Styling:** MUI's styling solution
- **Date Handling:** date-fns
- **Type Safety:** TypeScript

## Architecture Decisions

### 1. Project Structure

```
/src
  /app                # Next.js app directory
  /entities          # Domain entities (prescriptions)
  /shared            # Shared components, hooks, utilities
```

- **Why?** Feature-based architecture keeps related code together, making it easier to maintain and scale.

### 2. State Management

- Used Zustand for global state management
- **Why?** 
  - Minimal boilerplate compared to Redux
  - Easy to test and maintain
  - Great TypeScript support
  - Can be split into multiple stores as the app grows

### 3. UI Framework

- Material-UI (MUI)
- **Why?**
  - Built-in accessibility
  - Consistent design system
  - Extensive component library
  - Easy to customize
  - Reduces custom CSS and design decisions

### 4. API Layer

- Repository pattern for API abstraction
- **Why?**
  - Easy to swap mock data for real API
  - Consistent interface for data operations
  - Simplified testing

### 5. Type Safety

- TypeScript throughout the application
- **Why?**
  - Catch errors at compile time
  - Better developer experience
  - Self-documenting code

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## Extending the Application

### Adding Real API Integration

1. Create a new repository implementation:
   ```typescript
   // src/entities/prescription/api/realPrescriptionRepository.ts
   export const realPrescriptionRepository: PrescriptionRepository = {
     getAll: async () => {
       const response = await fetch('/api/prescriptions');
       return response.json();
     },
     // ... other methods
   };
   ```

2. Update the store to use the real repository:
   ```typescript
   import { realPrescriptionRepository } from './realPrescriptionRepository';
   ```

### Adding Authentication

1. Implement an auth store with Zustand
2. Add protected routes using Next.js middleware
3. Include auth tokens in API requests

### Adding Tests

1. Unit tests for stores and utilities
2. Component tests with React Testing Library
3. E2E tests with Cypress or Playwright

## Performance Considerations

- Code splitting via Next.js
- Optimized images and assets
- Efficient state updates
- Debounced search input
- Memoized components where needed

## Accessibility

- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support
- Color contrast compliance

## Future Improvements

1. Add error boundaries
2. Implement proper loading states
3. Add pagination for prescription list
4. Implement proper form validation
5. Add unit and integration tests
6. Set up CI/CD pipeline
7. Add analytics and monitoring 