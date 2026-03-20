const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'components', 'Screens', 'plan-to-trip');
let count = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.tsx')) {
      let content = fs.readFileSync(full, 'utf-8');
      let newContent = content;
      // Remove single-line loadingContainer
      newContent = newContent.replace(/\n  loadingContainer: \{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100 \},/g, '');
      // Remove multi-line loadingContainer (6 lines)
      newContent = newContent.replace(/\n  loadingContainer: \{\n    flex: 1,\n    justifyContent: 'center',\n    alignItems: 'center',\n    paddingTop: 100,\n  \},/g, '');
      if (newContent !== content) {
        count++;
        fs.writeFileSync(full, newContent, 'utf-8');
      }
    }
  }
}

walk(base);
console.log('Modified ' + count + ' files');
