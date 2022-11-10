/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/*.html', ],
  theme: {
    extend: {
      backgroundImage: theme => ({
                'background-picture': "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../pictures/backgroundImg')",
      }) 
    },
  },
  variants: {
  //extend: {},
  },
  plugins: [],
};

