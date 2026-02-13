const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'my-next-app', 'src', 'pages', 'Cities');

function walk(dir) {
  const res = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) res.push(...walk(p));
    else if (p.endsWith('.tsx')) res.push(p);
  }
  return res;
}

function extractRequiredArrayProps(typeBlock) {
  // find lines like 'shops: Shop[];' or 'buildings: Building[];'
  const lines = typeBlock.split(/\r?\n/);
  const props = [];
  for (let line of lines) {
    line = line.trim();
    // skip optional props
    if (line.includes('?:')) continue;
    const m = line.match(/^([a-zA-Z0-9_]+)\s*:\s*[A-Za-z0-9_\[\]]+\s*;/);
    if (m) {
      const name = m[1];
      // ignore title and city
      if (name === 'title' || name === 'city') continue;
      props.push(name);
    }
  }
  return props;
}

const files = walk(root);
let patched = 0;

for (const file of files) {
  let s = fs.readFileSync(file, 'utf8');
  if (!/setData\(\{\s*title:/.test(s)) continue;

  // find type block: nearest 'type \w+PageData = { ... };'
  const typeMatch = s.match(/type\s+\w+PageData\s*=\s*\{([\s\S]*?)\};/m);
  if (!typeMatch) continue;
  const typeBlock = typeMatch[1];
  const props = extractRequiredArrayProps(typeBlock);
  if (props.length === 0) {
    // if no other required props, set title only
    continue;
  }

  // build replacement for setData({ title: ... }) occurrences
  // handle patterns: setData({ title: "..." }); and setData({ title: cityName });
  const replacement = (match) => {
    // decide titleExpression inside match
    const titleExprMatch = match.match(/setData\(\{\s*title\s*:\s*([^}]+)\}\s*\)/s);
    if (!titleExprMatch) return match;
    const titleExpr = titleExprMatch[1].trim();
    const propsAssign = props.map(p => `  ${p}: []`).join(',\n');
    const newObj = `{ title: ${titleExpr},\n${propsAssign} }`;
    return `setData(${newObj})`;
  };

  const newS = s.replace(/setData\(\{\s*title\s*:\s*([^}]+)\}\s*\)/g, (m) => replacement(m));
  if (newS !== s) {
    fs.writeFileSync(file, newS, 'utf8');
    patched++;
    console.log('Patched', file);
  }
}

console.log('Done. Files patched:', patched);
