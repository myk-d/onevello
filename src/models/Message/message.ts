import z from 'zod';

const MessageMetadata = {
	createdAt: z.string(),
	expiration: z.string(),
	oneTime: z.boolean(),
};

export const MessageSchema = z.object({
	id: z.string(),
	...MessageMetadata,
	ctB64: z.string(),
	tagB64: z.string(),
	ivB64: z.string(),
	saltB64: z.string(),
	passwordSaltB64: z.string(),
	seq: z.number(),
	algo: z.enum(['AES-GCM', 'AES-GCM-DET']),
	ts: z.number(),
});

export const CreateMessageSchema = z
	.object({
		text: z.string().trim().min(1, { message: 'Secret text is required' }),
		passphrase: z.string().trim().min(3, { message: 'Passphrase is required' }),
		...MessageMetadata,
	})
	.partial({ expiration: true });

export type MessageType = z.infer<typeof MessageSchema>;
export type CreateMessageType = z.infer<typeof CreateMessageSchema>;
