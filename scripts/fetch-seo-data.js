/**
 * Pre-build script to fetch SEO data from API
 * Creates seodata.json for use in vite.config.js and prerendering
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  SLUG_URL: process.env.VITE_SLUG_URL || "studioapartmentsinpune.com",
  API_URL: process.env.VITE_API_URL || "https://www.buyindiahomes.in/api",
};

async function fetchSeoData() {
  try {
    console.log('Fetching SEO data from API...');
    console.log(`Domain: ${config.SLUG_URL}`);
    console.log(`API URL: ${config.API_URL}`);
    
    const response = await fetch(`${config.API_URL}/seo-detail?website=${config.SLUG_URL}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch SEO data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure the data structure matches expected format
    const seoData = {
      success: true,
      data: {
        title: data.data?.title || 'Studio Apartments',
        meta_description: data.data?.meta_description || 'Find your perfect studio apartment',
        keywords: data.data?.keywords || '',
        og_title: data.data?.og_title || data.data?.title || '',
        og_description: data.data?.og_description || data.data?.meta_description || '',
        og_image: data.data?.og_image || '',
        og_type: data.data?.og_type || 'website',
        favicon: data.data?.favicon || '/favicon.ico',
        status: data.data?.status || 'Active',
        script_1: (() => {
          let script = data.data?.script_1 || '{}';
          if (typeof script === 'string' && script !== '{}') {
            // Extract JSON content if script contains <script> tags
            const scriptMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            if (scriptMatch) {
              script = scriptMatch[1].trim();
            }
            // Remove any remaining script tags
            script = script.replace(/<\/?script[^>]*>/gi, '').trim();
            script = script.replace(/&lt;\/?script[^&]*&gt;/gi, '').trim();
          }
          return script;
        })(),
        script_2: (() => {
          let script = data.data?.script_2 || '{}';
          if (typeof script === 'string' && script !== '{}') {
            const scriptMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
            if (scriptMatch) {
              script = scriptMatch[1].trim();
            }
            script = script.replace(/<\/?script[^>]*>/gi, '').trim();
            script = script.replace(/&lt;\/?script[^&]*&gt;/gi, '').trim();
          }
          return script;
        })(),
        domain: config.SLUG_URL,
        lang: data.data?.lang || 'en',
        gtag_id: data.data?.gtag_id || null,
        whatsapp_gtag_id: data.data?.whatsapp_gtag_id || null,
        phone_conversation_number: data.data?.phone_conversation_number || null,
        phone_conversation_id: data.data?.phone_conversation_id || null,
      }
    };
    
    // Write seodata.json
    const outputPath = path.join(__dirname, '..', 'seodata.json');
    fs.writeFileSync(outputPath, JSON.stringify(seoData, null, 2), 'utf-8');
    
    console.log('✓ SEO data fetched and saved to seodata.json');
    console.log(`Title: ${seoData.data.title}`);
    
  } catch (error) {
    console.error('Error fetching SEO data:', error.message);
    console.log('Using default SEO data...');
    
    // Create default seodata.json
    const defaultData = {
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
        domain: config.SLUG_URL,
        lang: 'en',
        gtag_id: null,
        whatsapp_gtag_id: null,
        phone_conversation_number: null,
        phone_conversation_id: null,
      }
    };
    
    const outputPath = path.join(__dirname, '..', 'seodata.json');
    fs.writeFileSync(outputPath, JSON.stringify(defaultData, null, 2), 'utf-8');
    
    process.exit(1); // Exit with error but continue build
  }
}

fetchSeoData();

