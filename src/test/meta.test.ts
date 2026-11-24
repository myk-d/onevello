import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = resolve(__dirname, '../..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');

describe('index.html meta and icons', () => {
	it('sets og and twitter tags with the English image', () => {
		for (const tag of ['og:title', 'og:description', 'og:image']) expect(html).toContain(`property="${tag}"`);
		expect(html).toContain('name="twitter:card" content="summary_large_image"');
		expect(html).toMatch(/og:image" content="https?:\/\/[^"]+\/og-en\.png"/);
	});

	it('links only icon files that exist in public/', () => {
		const hrefs = [...html.matchAll(/<link rel="(?:icon|apple-touch-icon)"[^>]*href="\/([^"]+)"/g)].map((m) => m[1]);
		expect(hrefs).toEqual(expect.arrayContaining(['favicon.svg', 'icon-32.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']));
		for (const h of hrefs) expect(existsSync(resolve(root, 'public', h))).toBe(true);
		expect(existsSync(resolve(root, 'public/og-uk.png'))).toBe(true);
	});
});
