// Builds README.md and index.html from games.json. Run: node build.mjs
import fs from 'node:fs';
const games = JSON.parse(fs.readFileSync(new URL('./games.json', import.meta.url), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const md = (s) => String(s).replace(/\|/g, '\\|');

const readme = `# Arcade

Browser games by deepakd0. Free to play, no sign-up.

**Site:** https://deepakd0.github.io/arcade/

| Game | What it is | Play | Source |
|---|---|---|---|
${games.map((g) => `| **${md(g.name)}** | ${md(g.tagline)} | ${g.play.map((p) => `[${md(p.label)}](${p.url})`).join(' · ')} | ${g.source ? `[GitHub](${g.source})` : 'Private'} |`).join('\n')}

${games.map((g) => `## ${g.name}

${g.description}

- **Genre:** ${g.genre}
- **Plays on:** ${g.platforms}
- **Play:** ${g.play.map((p) => `[${p.label}](${p.url})`).join(' · ')}
- **Source:** ${g.source ? g.source : 'private'}
`).join('\n')}

## Copyright

© 2026 Deepak Dobariyal. All rights reserved. The games may be played in a browser. Copying, modifying, re-hosting or redistributing any game, code or art, or presenting it as your own, is not allowed without written permission. See [LICENSE](LICENSE).
---
Adding a game: add an entry to \`games.json\`, run \`node build.mjs\`, commit.
`;

const cards = games.map((g) => `
    <article class="game" style="--accent:${esc(g.accent || '#3498db')}">
      <h2>${esc(g.name)}</h2>
      <p class="tag">${esc(g.tagline)}</p>
      <p>${esc(g.description)}</p>
      <p class="meta">${esc(g.genre)} · ${esc(g.platforms)}</p>
      <div class="play">${g.play.map((p) => `<a class="btn" href="${esc(p.url)}">${esc(p.label)} &rarr;</a>`).join('')}</div>
      <p class="links">${g.source ? `Source on <a href="${esc(g.source)}">GitHub</a>` : 'Source private'}</p>
    </article>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Arcade</title>
  <meta name="description" content="Browser games: free to play, no sign-up.">
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #1a1a1a; color: #e0e0e0; margin: 0; padding: 40px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { color: #fff; font-size: 2.5em; margin: 0 0 8px; }
    .tagline { color: #aaa; font-size: 1.1em; margin: 0 0 32px; }
    .game { background: #2a2a2a; padding: 28px; margin: 20px 0; border-radius: 8px; border-left: 4px solid var(--accent); }
    .game h2 { margin: 0; color: #fff; font-size: 1.7em; }
    .game .tag { color: var(--accent); margin: 4px 0 14px; font-weight: 600; }
    .game p { color: #bbb; line-height: 1.6; }
    .meta { font-size: 0.9em; color: #888 !important; }
    .play { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
    .btn { display: inline-block; padding: 12px 26px; background: #3498db; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .btn:hover { background: #2980b9; }
    .links { font-size: 0.9em; color: #888 !important; margin-top: 12px; }
    .links a { color: #3498db; text-decoration: none; }
    .links a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main class="container">
    <h1>Arcade</h1>
    <p class="tagline">Browser games. Free to play, no sign-up.</p>
${cards}
    <p class="meta" style="margin-top:32px">&copy; 2026 Deepak Dobariyal. All rights reserved. No copying, reuse or redistribution without written permission. See <a href="LICENSE" style="color:inherit">LICENSE</a>.</p>
  </main>
</body>
</html>
`;
fs.writeFileSync(new URL('./README.md', import.meta.url), readme);
fs.writeFileSync(new URL('./index.html', import.meta.url), html);
console.log(`built ${games.length} games`);
