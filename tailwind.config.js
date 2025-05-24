// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./*.{html,js}"
  ],

  safelist: [
    // Static class names
    'hidden', 'block', 'flex', 'inline-block', 'lg:inline-block',
    'translate-x-full', '-translate-x-full',
    'translate-y-0', '-translate-y-full',
    'opacity-0', 'opacity-100',
    'w-60', 'w-64', 'w-80',
    'bg-black', 'bg-opacity-50',
    'h-1', 'h-14',
    'fixed', 'absolute', 'top-[7px]', 'right-[8%]', 'bottom-0', 'left-0',
    'transition-all', 'duration-300', 'ease-in-out', 'ease-linear',

    // Dynamic bg utilities used in toast
    {
      pattern: /bg-(green|red|yellow|blue)-(100|600)/,
    },
  ],


  theme: {
    extend: {

      height: {
        'dvh': '100dvh',
      },
      minHeight: {
        'dvh': '100dvh',
      },

      fontFamily: {
        fira: ['"Fira Sans"', 'sans-serif'],
        arsenal: ['"Arsenal SC"', 'sans-serif'],
        bad: ['"Bad Script"', 'cursive'],
        cambo: ['"Cambo"', 'serif'],
        fredericka: ['"Fredericka the Great"', 'cursive'],
        inria: ['"Inria Serif"', 'serif'],
        kdam: ['"Kdam Thmor Pro"', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        tagesschrift: ['"Tagesschrift"', 'cursive'],
      },
    },
  },
  plugins: [],
}