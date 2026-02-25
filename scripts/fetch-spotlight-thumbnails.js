/*
  Fetch Instagram post thumbnails via read-only proxy and save under public/spotlights/{shortcode}.jpg
  Usage: node scripts/fetch-spotlight-thumbnails.js
*/

const fs = require('fs');
const path = require('path');
const https = require('https');

const POSTS = [
  'https://www.instagram.com/p/DKDrctCRjg6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DKBGFPPuQui/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DJ-hZqSvuRb/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DJ78YFesQrH/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DJ5YKCbhTVn/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DJ2zIbUzoq3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/p/DJ0OG5KRnDc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
];

function shortcode(url) {
  const m = url.match(/\/p\/([^/?]+)/);
  return m ? m[1] : null;
}

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status ${res.statusCode}`));
        res.resume();
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, outPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status ${res.statusCode}`));
        res.resume();
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(outPath, () => reject(err));
    });
  });
}

async function main() {
  const outDir = path.join(process.cwd(), 'public', 'spotlights');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const post of POSTS) {
    const code = shortcode(post);
    if (!code) {
      console.log(`Skip (no shortcode): ${post}`);
      continue;
    }
    const htmlUrl = `https://r.jina.ai/http://www.instagram.com/p/${code}/`;
    try {
      const html = await fetchHtml(htmlUrl);
      const m = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
      if (!m) {
        console.log(`No og:image for ${code}`);
        continue;
      }
      const imgUrl = m[1];
      const outPath = path.join(outDir, `${code}.jpg`);
      await downloadFile(imgUrl, outPath);
      console.log(`Saved: ${outPath}`);
    } catch (e) {
      console.log(`Error ${code}: ${e.message}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

