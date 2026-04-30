from pathlib import Path
import re

root = Path('public')
index = (root / 'index.html').read_text()
css = (root / 'styles.css').read_text()
js = (root / 'script.js').read_text()

required_terms = [
    'Heinous Crimes Unit', 'The Surgeon’s Scalpel', 'The Priest’s Fire', 'The Lover’s Chain',
    'The General’s Weapons', 'The Animal’s Hunt', 'The Titan’s Empire', 'The Poet’s Blood',
    'The Titan’s Release', 'The Accountant’s Ledger', 'A Murderous Mind', 'Hunter', 'Obsession',
    'Consumed', 'A Desperate Man', 'A Desperate Nation', 'A Desperate World', 'Dark Pursuits',
    'A Friend of the Dead', 'A Friend of a Friend', 'A Friend to Fear',
    'https://www.amazon.com/Daniel-Scott/e/B0B6QCQ8RV',
    'https://www.readdanielscott.com/'
]
missing = [term for term in required_terms if term not in index]
if missing:
    raise SystemExit(f'Missing required terms: {missing}')

for filename, text in [('index.html', index), ('styles.css', css), ('script.js', js)]:
    if not text.strip():
        raise SystemExit(f'{filename} is empty')

hrefs = re.findall(r'href="([^"]+)"', index)
local_hrefs = [href for href in hrefs if not (href.startswith('http') or href.startswith('#'))]
missing_files = [href for href in local_hrefs if not (root / href).exists()]
if missing_files:
    raise SystemExit(f'Missing local href targets: {missing_files}')

scripts = re.findall(r'src="([^"]+)"', index)
missing_scripts = [src for src in scripts if not (root / src).exists()]
if missing_scripts:
    raise SystemExit(f'Missing scripts: {missing_scripts}')

print('OK: Daniel Scott site content and local assets verified.')
