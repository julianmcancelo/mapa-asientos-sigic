import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'MapaAsientosSigic',
      fileName: (format) => `mapa-asientos.${format}.js`,
    },
    rollupOptions: {
      // Dependencias externas: no se empaquetan en el bundle
      external: ['react', 'react-dom', 'lucide-react'],
      output: {
        globals: {
          react:          'React',
          'react-dom':    'ReactDOM',
          'lucide-react': 'LucideReact',
        },
        // Asegurar que los estilos CSS se emitan correctamente
        assetFileNames: 'style.css',
      },
    },
    // Generar source maps para facilitar debugging
    sourcemap: true,
    // Limpiar el dist antes de cada build
    emptyOutDir: true,
  },
});
