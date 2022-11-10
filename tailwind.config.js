/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*/*.html', ],
  theme: {
    extend: {
      backgroundImage: theme => ({
                'background-picture': "url('../pictures/backgroundImg')",
      }) 
    },
  },
  variants: {
  //extend: {},
  },
  plugins: [],
};

