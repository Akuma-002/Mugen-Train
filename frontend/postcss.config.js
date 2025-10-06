export default {
  plugins: {
    // Enable CSS nesting before Tailwind (required for nested rules/@media inside selectors)
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
