/**
 * Post-build script to make CSS loading non-blocking
 * Processes all HTML files in dist directory
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, '..', 'dist');

function makeCSSNonBlocking(html) {
  return html.replace(
    /<link\s+([^>]*rel=["']stylesheet["'][^>]*?)>/gi,
    (match, attrs) => {
      if (attrs.includes('fonts.googleapis.com')) {
        return match;
      }
      
      if (attrs.includes('media="print"') && attrs.includes('onload=') && attrs.includes("this.media='all'")) {
        return match;
      }
      
      const isSelfClosing = match.trim().endsWith('/>');
      
      let newAttrs = attrs.trim();
      newAttrs = newAttrs.replace(/[\/>]*$/, '');
      newAttrs = newAttrs.replace(/media=["'][^"']*["']/g, '');
      newAttrs = newAttrs.replace(/onload=["'][^"']*["']/g, '');
      newAttrs = newAttrs.replace(/\s+/g, ' ').trim();
      
      newAttrs += ' media="print" onload="this.media=\'all\';this.onload=null"';
      
      const newTag = isSelfClosing 
        ? `<link ${newAttrs} />`
        : `<link ${newAttrs}>`;
      
      const noscriptFallback = match
        .replace(/media=["'][^"']*["']/g, '')
        .replace(/onload=["'][^"']*["']/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      return `${newTag}<noscript>${noscriptFallback}</noscript>`;
    }
  );
}

function processHTMLFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.error('Dist directory not found!');
    return;
  }
  
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processHTMLFiles(filePath);
    } else if (file.endsWith('.html')) {
      const html = fs.readFileSync(filePath, 'utf-8');
      const modifiedHtml = makeCSSNonBlocking(html);
      fs.writeFileSync(filePath, modifiedHtml, 'utf-8');
      console.log(`✓ Processed: ${filePath}`);
    }
  });
}

if (fs.existsSync(distDir)) {
  console.log('Making CSS non-blocking in HTML files...');
  processHTMLFiles(distDir);
  console.log('✓ CSS non-blocking transformation complete!');
} else {
  console.error('Dist directory not found!');
  process.exit(1);
}

