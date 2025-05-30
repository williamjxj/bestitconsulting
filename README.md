This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Quality & Development Tools

This project is configured with a comprehensive code quality setup:

### ESLint

- **Configuration**: Extended from Next.js and TypeScript recommendations
- **Run linting**: `npm run lint`
- **Auto-fix issues**: `npm run lint:fix`

### Prettier

- **Configuration**: `.prettierrc.json` with project-specific rules
- **Format code**: `npm run format`
- **Check formatting**: `npm run format:check`

### EditorConfig

- **File**: `.editorconfig` ensures consistent coding styles across different editors
- **Settings**: 2-space indentation, LF line endings, UTF-8 encoding

### TypeScript

- **Type checking**: `npm run type-check`
- **Strict mode enabled** with comprehensive type checking

### Available Scripts

```bash
# Development
npm run dev              # Start development server

# Building
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint with auto-fix
npm run format          # Format code with Prettier
npm run format:check    # Check if code is formatted
npm run type-check      # Run TypeScript type checking
npm run quality         # Run all quality checks (lint, format, type-check)
```

### VS Code Integration

- **Auto-format on save** with Prettier
- **Auto-fix ESLint issues** on save
- **EditorConfig support** for consistent formatting
- **TypeScript integration** with auto-imports

### Recommended VS Code Extensions

- ESLint
- Prettier - Code formatter
- EditorConfig for VS Code
- TypeScript Importer

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
