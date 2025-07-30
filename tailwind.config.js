/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        pending: '#e6f0ff',
        overdue: '#ffeaea',
        completed: '#ebfbee',
        priority: {
          low: '#e7f8ec',
          medium: '#fff6e5',
          high: '#ffebee'
        }
      }
    }
  },
  plugins: [],
}