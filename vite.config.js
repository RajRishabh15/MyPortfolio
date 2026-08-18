import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home:        resolve(__dirname, 'index.html'),
        about:       resolve(__dirname, 'about.html'),
        projects:    resolve(__dirname, 'projects.html'),
        skills:      resolve(__dirname, 'skills.html'),
        contact:     resolve(__dirname, 'contact.html'),
        education:   resolve(__dirname, 'education.html'),
        credentials: resolve(__dirname, 'credentials.html'),
      },
    },
  },
});
