import z from 'zod';

export const PassphraseSchema = z.object({
	passphrase: z.string().trim().min(3, { message: 'Passphrase is required' }),
});

export type PassphraseType = z.infer<typeof PassphraseSchema>;
