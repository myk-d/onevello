import { describe, expect, it } from 'vitest';
import en from '../i18n/locales/en';
import uk from '../i18n/locales/uk';

const flatten = (value: unknown, prefix = ''): [string, string][] => {
	if (typeof value === 'string') return [[prefix, value]];
	if (Array.isArray(value)) return value.flatMap((v, i) => flatten(v, `${prefix}[${i}]`));
	if (value && typeof value === 'object') {
		return Object.entries(value).flatMap(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k));
	}
	return [];
};

const banned = [
	/military[- ]grade/i,
	/unhackable/i,
	/100% secure/i,
	/\bno trace\b/i,
	/zero logs?/i,
	/no logs/i,
	/do not collect ip/i,
	/disappear forever/i,
	/військов\S* рівн/i,
	/без слідів/i,
];

describe('brand copy', () => {
	const enFlat = flatten(en);
	const ukFlat = flatten(uk);

	it('keeps uk and en key-identical', () => {
		expect(ukFlat.map(([k]) => k)).toEqual(enFlat.map(([k]) => k));
	});

	it('contains no banned words or overclaims', () => {
		const offenders = [...enFlat, ...ukFlat].filter(([, text]) => banned.some((re) => re.test(text))).map(([k]) => k);
		expect(offenders).toEqual([]);
	});

	it('uses the brand create button copy', () => {
		expect(en.form.createLink).toBe('Seal and create link');
		expect(uk.form.createLink).toBe('Запечатати й створити посилання');
		expect(en.secretId.preview).toBe('Open');
	});

	it('uses no exclamation marks in strings', () => {
		const offenders = [...enFlat, ...ukFlat].filter(([, text]) => text.includes('!')).map(([k]) => k);
		expect(offenders).toEqual([]);
	});
});
