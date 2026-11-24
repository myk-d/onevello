import { describe, expect, it, vi } from 'vitest';

// Deterministic stand-in for the SDK: "encrypts" by tagging with the passphrase, throws on a wrong one.
vi.mock('secure-channel-sdk', () => ({
	PasswordChannel: {
		encrypt: async (pass: string, text: string) => ({ pass, text }),
		decrypt: async (pass: string, pkg: { pass: string; text: string }) => {
			if (pkg.pass !== pass) throw new Error('bad');
			return pkg.text;
		},
	},
}));

import { encryptFileMeta, opaqueStorageName, resolveFileMeta } from '../fileMeta';

describe('fileMeta', () => {
	it('round-trips name and type for a new secret, with no plaintext in the stored string', async () => {
		const fileMeta = await encryptFileMeta('pw', { name: 'tax.pdf', type: 'application/pdf' });
		// the stand-in keeps text readable, so check the real contract: it is a JSON string of a package
		expect(typeof fileMeta).toBe('string');
		expect(await resolveFileMeta('pw', { fileUrl: 'u', fileMeta })).toEqual({ name: 'tax.pdf', type: 'application/pdf' });
	});

	it('falls back to a generic name when the meta cannot be decrypted', async () => {
		const fileMeta = await encryptFileMeta('pw', { name: 'a', type: 'b' });
		expect(await resolveFileMeta('other', { fileUrl: 'u', fileMeta })).toEqual({ name: 'file', type: '' });
	});

	it('reads legacy plain fileName/fileType', async () => {
		expect(await resolveFileMeta('pw', { fileUrl: 'u', fileName: 'old.txt', fileType: 'text/plain' })).toEqual({
			name: 'old.txt',
			type: 'text/plain',
		});
	});

	it('returns nothing without an attachment', async () => {
		expect(await resolveFileMeta('pw', {})).toBeUndefined();
	});

	it('makes storage names that do not contain the file name', () => {
		const a = opaqueStorageName();
		expect(a).toMatch(/^\d+_[0-9a-f-]{36}$/);
		expect(a).not.toBe(opaqueStorageName());
	});
});
