/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        "search-result": "var(--bg-color-search-result)",
        "search-result-hover": "var(--bg-color-search-result-hover)",
        "logo": "var(--color-logo-primary)",
        "primary": "var(--bg-color-primary)",
        "secondary": "var(--bg-color-secondary)",
        "button-primary": "var(--button-color-primary)",
        "button-hover-primary": "var(--button-hover-color-primary)",
        "search-bar": "var(--bg-color-search-bar)",
        "search-bar-list": "var(--bg-color-search-bar-list)",
        "search-bar-result": "var(--bg-color-search-bar-result)",
        "search-bar-result-hover": "var(--bg-color-hover-search-bar-result)",
      },

      fontFamily: {
        "logo": "var(--logo-font)",
        "logo-2": "var(--logo-font-2)",
      },

      textColor: {
        "heading-muted": "var(--text-color-heading-muted)",
        "heading-primary": "var(--text-color-heading-primary)",
        "logo-third": "var(--color-logo-third)",
        "href-primary": "var(--text-color-href-primary)",
        "primary": "var(--text-color-primary)",
        "secondary": "var(--text-color-secondary)",
        "search-bar-result": "var(--text-color-search-bar-result)",
        "logo-secondary": "var(--color-logo-secondary)",
        "logo": "var(--color-logo-primary)",
        "search-bar-input": "var(--text-color-search-bar-input)",
        "search-history-result": "var(--text-color-search-history-result)",
        "muted": "var(--text-color-muted)",
        "error": "var(--text-color-error)"
      },
    },
  },
  plugins: [],
}
