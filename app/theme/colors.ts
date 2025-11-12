// app/theme/colors.ts

export const colors = {
  // Light theme colors
  light: {
    primary: '#6D4FED', // Indigo 600
    secondary: '#FF83F9', // Emerald 500
    background: '#121212', // White
    text: '#0E0D35', // Gray 800
    muted: '#B0B5BC', // Gray 500
    border: '#E0E2E4', // Gray 200
  },
  // Dark theme colors
  dark: {
    primary: '#6147D3', // Indigo 400
    secondary: '#E978E4', // Emerald 400
    background: '#121212', // Gray 800
    text: '#F9FAFB', // Gray 50
    muted: '#C0C4CA', // Gray 400
    border: '#A1A7Af', // Gray 600
  },
};

// You can also define semantic colors that automatically switch based on theme
// This approach is often preferred with Tailwind's dark mode
export const semanticColors = {
  primary: {
    DEFAULT: colors.light.primary,
    dark: colors.dark.primary,
  },
  secondary: {
    DEFAULT: colors.light.secondary,
    dark: colors.dark.secondary,
  },
  background: {
    DEFAULT: colors.light.background,
    dark: colors.dark.background,
  },
  text: {
    DEFAULT: colors.light.text,
    dark: colors.dark.text,
  },
  muted: {
    DEFAULT: colors.light.muted,
    dark: colors.dark.muted,
  },
  border: {
    DEFAULT: colors.light.border,
    dark: colors.dark.border,
  },
};
