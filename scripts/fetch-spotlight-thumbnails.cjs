/*
  Fetch Instagram post thumbnails via read-only proxy and save under public/spotlights/{shortcode}.jpg
  Usage: node scripts/fetch-spotlight-thumbnails.cjs
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
    const options = new URL(url);
    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + (options.search || ''),
      protocol: options.protocol,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36' }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status ${res.statusCode}`));
        res.resume();
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

function downloadFile(url, outPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outPath);
    const options = new URL(url);
    const req = https.request({
      hostname: options.hostname,
      path: options.pathname + (options.search || ''),
      protocol: options.protocol,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36' }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status ${res.statusCode}`));
        res.resume();
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', (err) => {
      fs.unlink(outPath, () => reject(err));
    });
    req.end();
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
    try {
      // Try oEmbed first
      const oembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(post)}`;
      let imgUrl = null;
      try {
        const json = await fetchHtml(oembedUrl);
        const mJson = json.match(/"thumbnail_url"\s*:\s*"([^"]+)"/);
        if (mJson) imgUrl = mJson[1].replace(/\\\//g, '/');
      } catch {}
      if (!imgUrl) {
        // Fallback to read-only proxy parsing og:image
        const htmlUrl = `https://r.jina.ai/http://www.instagram.com/p/${code}/`;
        const html = await fetchHtml(htmlUrl);
        const m = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        if (m) imgUrl = m[1];
      }
      if (!imgUrl) {
        console.log(`No image for ${code}`);
        continue;
      }
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
