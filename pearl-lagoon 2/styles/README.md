# Styles

This project follows the Next.js 15 App Router convention, so the actual
global stylesheet lives at `app/globals.css` (it must be imported from
`app/layout.tsx` to apply globally) and the design tokens (colors, fonts,
animations) live in `tailwind.config.ts` at the project root.

This folder is kept as a place to add any future standalone stylesheets,
CSS modules, or design-token exports that aren't tied to a single component.
