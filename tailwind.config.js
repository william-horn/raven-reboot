/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './libs/utils/*.js',
    './tailwind-presets/*.js',
    './tailwind-presets/**/*.js'
  ],
  theme: {
    extend: {
      borderColor: {
        // Dividing lines
        "primary-line": "var(--bg-color-primary-line)",
        "primary-inset-line": "var(--bg-color-primary-inset-line)",
        "secondary-line": "var(--bg-color-secondary-line)",
        "secondary-inset-line": "var(--bg-color-secondary-inset-line)",
      },

      backgroundColor: {
        // General
        "landing-page": "var(--bg-color-landing-page)",
        "button-primary": "var(--bg-color-button-primary)",
        "button-hover-primary": "var(--bg-color-button-primary-hover)",

        // Dividing lines
        "primary-line": "var(--bg-color-primary-line)",
        "primary-inset-line": "var(--bg-color-primary-inset-line)",
        "secondary-line": "var(--bg-color-secondary-line)",
        "secondary-inset-line": "var(--bg-color-secondary-inset-line)",

        // Landing page
        "landing-page-entry-button": "var(--bg-color-landing-page-entry-button)",
        "landing-page-entry-button-hover": "var(--bg-color-landing-page-entry-button-hover)",

        // Nav bar buttons
        "navbar-button-primary": "var(--bg-color-navbar-button-primary)",
        "navbar-button-primary-hover": "var(--bg-color-navbar-button-primary-hover)",

        "navbar-button-secondary": "var(--bg-color-navbar-button-secondary)",
        "navbar-button-secondary-hover": "var(--bg-color-navbar-button-secondary-hover)",

        "navbar-button-primary-selected": "var(--bg-color-navbar-button-primary-selected)",
        "navbar-button-primary-selected-hover": "var(--bg-color-navbar-button-primary-selected-hover)",

        "navbar-button-secondary-selected": "var(--bg-color-navbar-button-secondary-selected)",
        "navbar-button-secondary-selected-hover": "var(--bg-color-navbar-button-secondary-selected-hover)",

        // Search bar
        "search-bar": "var(--bg-color-search-bar)",
        "search-bar-dropdown": "var(--bg-color-search-bar-dropdown)",
        "search-bar-result": "var(--bg-color-search-bar-result)",
        "search-bar-result-hover": "var(--bg-color-hover-search-bar-result)",
        "search-bar-result-icon": "var(--bg-color-search-bar-result-icon)",

        "search-bar-scrollbar": "var(--bg-color-search-bar-scrollbar)",
        "search-bar-scrollbar-hover": "var(--bg-color-search-bar-scrollbar-hover)",

        // General background colors
        "primary": "var(--bg-color-primary)",
        "primary-inset": "var(--bg-color-primary-inset)",
        "secondary": "var(--bg-color-secondary)",
        "secondary-inset": "var(--bg-color-secondary-inset)",

        // Scrollbar
        "scrollbar": "var(--bg-color-scroll-bar)",
        "scrollbar-hover": "var(--bg-color-scroll-bar-hover)",
      },

      fontFamily: {
        "gf-1": "var(--google-font-1)",
        "gf-2": "var(--google-font-2)",
      },

      textColor: {
        // General
        "inset-secondary": "var(--text-color-inset-bg-secondary)",
        "primary": "var(--text-color-primary)",
        "muted": "var(--text-color-muted)",
        "error": "var(--text-color-error)",
        "hyperlink": "var(--text-color-hyperlink)",
        "hyperlink-hover": "var(--text-color-hyperlink-hover)",

        // Footer
        "footer-heading-primary": "var(--text-color-footer-heading-primary)",

        // logo
        "logo-first-half": "var(--text-color-logo-first-half)",
        "logo-second-half": "var(--text-color-logo-second-half)",

        // Search bar
        "search-bar-result": "var(--text-color-search-bar-result)",
        "search-bar-input": "var(--text-color-search-bar-input)",
        "search-history-result": "var(--text-color-search-history-result)",
        "search-bar-result-match-word": "var(--text-color-search-bar-result-match-word)",
        "search-bar-result-match-first": "var(--text-color-search-bar-result-match-first)",
        "search-bar-result-match-any": "var(--text-color-search-bar-result-match-any)",
        "search-bar-placeholder": "var(--text-color-search-bar-placeholder)",
      },

      dropShadow: {
        "logo-first-half": "var(--drop-shadow-logo-first-half)",
        "logo-second-half": "var(--drop-shadow-logo-second-half)",
        "logo-first-half-hover": "var(--drop-shadow-logo-first-half-hover)",
        "logo-second-half-hover": "var(--drop-shadow-logo-second-half-hover)",
      }
    },
  },
  plugins: [],
}
