"""Validate and stage the GitHub Pages site for a private Sites preview."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href'):
            if key in attrs:
                self.links.append(attrs[key])

for name in ('index.html', '404.html'):
    page = Page()
    page.feed((ROOT / name).read_text())
    assert len(page.ids) == len(set(page.ids)), f'Duplicate IDs in {name}'
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        if url.path and url.path != '/':
            assert (ROOT / unquote(url.path).lstrip('/')).is_file(), f'Missing asset: {link}'
        elif url.fragment:
            assert url.fragment in page.ids, f'Missing anchor: {link}'
for script in (ROOT / 'js').glob('*.js'):
    subprocess.run(['node', '--check', str(script)], check=True)
output = ROOT / 'dist'
output.mkdir(exist_ok=True)
for name in ('index.html', '404.html', 'manifest.json', 'robots.txt', 'sitemap.xml', '.nojekyll'):
    shutil.copy2(ROOT / name, output / name)
for name in ('assets', 'css', 'js'):
    shutil.copytree(ROOT / name, output / name, dirs_exist_ok=True, ignore=shutil.ignore_patterns('.DS_Store'))
print('Validated HTML anchors, local assets, and JavaScript. Static site staged in dist/.')
