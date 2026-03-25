const fs = require('fs');

// Read original blog post page from saved backup
let src = fs.readFileSync('f:/CMS sukientoanquoc/scripts/original-slug-page.tsx', 'utf8');

// Replace /blog/ URLs with root URLs
src = src.replace(/`https:\/\/sukientoanquoc\.com\/blog\//g, '`https://sukientoanquoc.com/');
src = src.replace(/\/blog\/\$\{slug\}/g, '/${slug}');
src = src.replace(/\/blog\/\$\{rp\.slug\}/g, '/${rp.slug}');

// Replace "Blog" with "Tin tức" in breadcrumbs and schema
src = src.replace('"Blog"', '"Tin t\u1ee9c"');
src = src.replace('sukientoanquoc.com/blog"', 'sukientoanquoc.com/tin-tuc"');
src = src.replace('href="/blog"', 'href="/tin-tuc"');
src = src.replace('>Blog<', '>Tin t\u1ee9c<');

// Write to [slug] directory
const dir = 'f:/CMS sukientoanquoc/src/app/[slug]';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(dir + '/page.tsx', src, 'utf8');
console.log('Created [slug]/page.tsx, length=' + src.length);
