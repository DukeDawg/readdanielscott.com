from pathlib import Path
import re

root = Path('public')
pages = sorted(root.glob('**/*.html'))
index_path = root / 'index.html'
index = index_path.read_text()
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

signup_terms = [
    'data-mailerlite-form',
    'data-mailerlite-success',
    'data-mailerlite-status',
    '187756443655472148',
    'mlb2-41418069',
    'ml_webform_success_41418069',
    'mailerLiteForms.forEach',
    'fetch(mailerLiteForm.action',
]
signup_sources = index + '\n' + js
missing_signup_terms = [term for term in signup_terms if term not in signup_sources]
if missing_signup_terms:
    raise SystemExit(f'Missing signup wiring terms: {missing_signup_terms}')

backmatter_path = root / 'readers' / 'index.html'
backmatter = backmatter_path.read_text()
backmatter_terms = [
    "Join Daniel Scott's reader list",
    'https://www.readdanielscott.com/readers/',
    '187841015656220137',
    'mlb2-41467195',
    'ml_webform_success_41467195',
    'data-mailerlite-success="ml_webform_success_41467195"',
    '../script.js?v=backmatter-signup',
    '../styles.css?v=backmatter-signup',
]
missing_backmatter_terms = [term for term in backmatter_terms if term not in backmatter]
if missing_backmatter_terms:
    raise SystemExit(f'Missing backmatter signup terms: {missing_backmatter_terms}')

for filename, text in [('styles.css', css), ('script.js', js)]:
    if not text.strip():
        raise SystemExit(f'{filename} is empty')

for page in pages:
    text = page.read_text()
    if not text.strip():
        raise SystemExit(f'{page} is empty')

    hrefs = re.findall(r'href="([^"]+)"', text)
    local_hrefs = [
        href for href in hrefs
        if not href.startswith(('http://', 'https://', '//', '#', 'mailto:', 'tel:'))
    ]
    missing_files = [
        f'{page}: {href}'
        for href in local_hrefs
        if not (page.parent / href.split('?', 1)[0]).resolve().exists()
    ]
    if missing_files:
        raise SystemExit(f'Missing local href targets: {missing_files}')

    scripts = re.findall(r'src="([^"]+)"', text)
    local_scripts = [src for src in scripts if not src.startswith(('http://', 'https://', '//'))]
    missing_scripts = [
        f'{page}: {src}'
        for src in local_scripts
        if not (page.parent / src.split('?', 1)[0]).resolve().exists()
    ]
    if missing_scripts:
        raise SystemExit(f'Missing scripts: {missing_scripts}')

print('OK: Daniel Scott site content and local assets verified.')
