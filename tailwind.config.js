/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette calquée sur l'identité BNP Paribas.
        // Vert primaire officiel #00965E (source : charte de marque BNP Paribas).
        brand: {
          50: '#EAF6F0',   // fond de page, teinte très légère
          100: '#CDEBDD',  // badges / surlignage doux
          200: '#8BC8AA',  // vert clair secondaire (dégradés, hover discret)
          400: '#00A86B',
          500: '#00965E',  // vert BNP Paribas officiel — couleur de marque principale
          600: '#007A4D',  // hover / actif
          700: '#005C3B',  // texte sur fond clair, variante foncée
          900: '#00331F'
        },
        ink: {
          900: '#161616',
          700: '#3B3B3B',
          500: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif']
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
};
