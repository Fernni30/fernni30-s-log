/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // F안(다크) 색상. 색을 바꾸려면 여기만 수정하면 됩니다.
      colors: {
        bg: '#111318',
        surface: { DEFAULT: '#1B1E25', soft: '#252A33', raised: '#2E3542' },
        fg: '#E8EBF0',
        muted: { DEFAULT: '#A9B1BF', soft: '#B4BCC9', raised: '#C9D0DA' },
        accent: {
          DEFAULT: '#AD98E6',
          strong: '#6D55B8',
          tag: '#B7A4EC',
          light: '#C3B3F0',
        },
        tape: '#4A5262',
        cover: {
          slate: '#333A47',
          steel: '#3B4454',
          black: '#08090C',
          gray: '#394150',
        },
      },
      fontFamily: {
        sans: ['"Gowun Dodum"', 'sans-serif'],
        hand: ['Gaegu', 'cursive'],
      },
      maxWidth: { page: '1120px' },
    },
  },
  plugins: [],
};
