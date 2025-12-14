import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import viteCompression from 'vite-plugin-compression';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read SEO data from seodata.json (created during prebuild)
let seoData = {
  success: true,
  data: {
    title: 'Studio Apartments',
    meta_description: 'Find your perfect studio apartment',
    keywords: 'studio apartments, real estate',
    og_title: 'Studio Apartments',
    og_description: 'Find your perfect studio apartment',
    og_image: '',
    og_type: 'website',
    favicon: '/favicon.ico',
    status: 'Active',
    script_1: '{}',
    script_2: '{}',
    domain: '',
    lang: 'en',
    gtag_id: null,
    whatsapp_gtag_id: null,
    phone_conversation_number: null,
    phone_conversation_id: null,
  }
};

// Try to read seodata.json if it exists
const seodataPath = path.join(__dirname, 'seodata.json');
if (fs.existsSync(seodataPath)) {
  try {
    seoData = JSON.parse(fs.readFileSync(seodataPath, 'utf-8'));
  } catch (e) {
    console.warn('Could not read seodata.json, using defaults');
  }
}

export default defineConfig({
  server: {
    host: true,
    open: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    middlewareMode: false,
  },
  publicDir: 'public',
  appType: 'spa',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
        dead_code: true,
        unused: true,
      },
      format: {
        comments: false,
        ecma: 2020,
      },
      mangle: {
        safari10: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('react-helmet')) {
              return 'helmet-vendor';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'motion-vendor';
            }
            if (id.includes('axios')) {
              return 'axios-vendor';
            }
            if (id.includes('chart.js') || id.includes('react-chartjs')) {
              return 'chart-vendor';
            }
            if (id.includes('slick') || id.includes('swiper')) {
              return 'slider-vendor';
            }
            return 'vendor';
          }
          if (id.includes('components/Gallery') || id.includes('components/Gallary')) {
            return 'gallery';
          }
          if (id.includes('components/Video')) {
            return 'video';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        compact: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  plugins: [
    react({
      include: /\.(jsx|js)$/,
    }),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          title: seoData.data.title || 'Studio Apartments',
          description: seoData.data.meta_description || 'Find your perfect studio apartment',
          keywords: seoData.data.keywords || '',
          og_title: seoData.data.og_title || '',
          og_description: seoData.data.og_description || '',
          og_image: seoData.data.og_image || '',
          og_type: seoData.data.og_type || 'website',
          favicon: seoData.data.favicon || '/favicon.ico',
          robots: seoData.data.status === 'Active' ? 'index, follow' : 'noindex, nofollow',
          script_1: (() => {
            if (!seoData.data.script_1 || seoData.data.script_1 === '{}') return '{}';
            let script = typeof seoData.data.script_1 === 'string' ? seoData.data.script_1 : JSON.stringify(seoData.data.script_1);
            // Extract JSON content if script contains <script> tags
            const scriptMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            if (scriptMatch) {
              script = scriptMatch[1].trim();
            }
            // Remove any remaining script tags (including escaped ones)
            script = script.replace(/<\/?script[^>]*>/gi, '').trim();
            script = script.replace(/&lt;\/?script[^&]*&gt;/gi, '').trim();
            // If it's already valid JSON, return as-is, otherwise wrap in {}
            try {
              JSON.parse(script);
              return script;
            } catch {
              return script || '{}';
            }
          })(),
          script_2: (() => {
            if (!seoData.data.script_2 || seoData.data.script_2 === '{}') return '{}';
            let script = typeof seoData.data.script_2 === 'string' ? seoData.data.script_2 : JSON.stringify(seoData.data.script_2);
            const scriptMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            if (scriptMatch) {
              script = scriptMatch[1].trim();
            }
            script = script.replace(/<\/?script[^>]*>/gi, '').trim();
            script = script.replace(/&lt;\/?script[^&]*&gt;/gi, '').trim();
            try {
              JSON.parse(script);
              return script;
            } catch {
              return script || '{}';
            }
          })(),
          domain: seoData.data.domain || '',
          lang: seoData.data.lang || 'en',
          gtag_id: seoData.data.gtag_id || null,
          whatsapp_gtag_id: seoData.data.whatsapp_gtag_id || null,
          phone_conversation_number: seoData.data.phone_conversation_number || null,
          phone_conversation_id: seoData.data.phone_conversation_id || null,
        },
      },
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],
});

