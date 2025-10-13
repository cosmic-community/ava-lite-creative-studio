const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '..', 'public', 'dashboard-console-capture.js'),
  'utf-8'
);

const scriptTag = `<script>${scriptContent}</script>`;

function injectScript(htmlPath) {
  if (!fs.existsSync(htmlPath)) return;
  
  let html = fs.readFileSync(htmlPath, 'utf-8');
  
  if (html.includes('dashboard-console-capture.js') || html.includes('console-capture-ready')) {
    console.log(`✓ Console capture already present in ${htmlPath}`);
    return;
  }
  
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${scriptTag}</head>`);
  } else if (html.includes('<body>')) {
    html = html.replace('<body>', `<body>${scriptTag}`);
  } else {
    console.log(`⚠ Could not inject into ${htmlPath}`);
    return;
  }
  
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✓ Injected console capture into ${htmlPath}`);
}

const outDir = path.join(__dirname, '..', '.next', 'server', 'app');

function findHtmlFiles(dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

console.log('🔧 Injecting console capture script...');
const htmlFiles = findHtmlFiles(outDir);

if (htmlFiles.length === 0) {
  console.log('⚠ No HTML files found in build output');
} else {
  htmlFiles.forEach(injectScript);
  console.log(`✓ Processed ${htmlFiles.length} HTML files`);
}