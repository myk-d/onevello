/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const brand = readFileSync('docs/product/brand/assets/brand.css', 'utf8');
const css = readFileSync('src/index.css', 'utf8');

const files = import.meta.glob<string>('/src/**/*.{ts,tsx,css}', { query: '?raw', import: 'default', eager: true });
const sourceFiles = Object.entries(files).filter(([path]) => !path.includes('.test.'));

describe('brand tokens', () => {
	it('uses no raw Tailwind palette colours in src', () => {
		const palette =
			/\b(?:bg|text|border|ring|fill|stroke|from|to|via|divide|outline|accent|caret|shadow)-(?:cyan|amber|green|red|gray|zinc|rose|purple|blue|yellow|slate|neutral|stone|orange|indigo)-\d{2,3}\b/;
		const offenders = sourceFiles.filter(([, content]) => palette.test(content)).map(([path]) => path);
		expect(sourceFiles.length).toBeGreaterThan(20);
		expect(offenders).toEqual([]);
	});

	it('keeps every brand.css token in index.css with identical values', () => {
		const norm = (s: string) => s.replace(/\s+/g, ' ');
		const tokens = brand.slice(0, brand.indexOf('/* ---------- base'));
		const decls = [...tokens.matchAll(/(--(?:color|shadow|font|text|leading|radius|space|duration|ease)-[\w-]+):\s*([^;]+);/g)];
		expect(decls.length).toBeGreaterThan(60);
		for (const [, name, value] of decls) {
			expect(norm(css), `${name}: ${value}`).toContain(norm(`${name}: ${value};`));
		}
	});
});
