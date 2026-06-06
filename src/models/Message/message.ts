import z from 'zod';

export const MAX_SECRET_LENGTH = 10_000;

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
	version: z.number().optional(),
	keyLengthBits: z.union([z.literal(128), z.literal(192), z.literal(256)]).optional(),
	fileUrl: z.string().optional(),
	fileName: z.string().optional(),
	fileType: z.string().optional(),
});

export const CreateMessageSchema = z
	.object({
		text: z
			.string()
			.trim()
			.min(1, { message: 'Secret text is required' })
			.max(MAX_SECRET_LENGTH, { message: `Max ${MAX_SECRET_LENGTH.toLocaleString()} characters` }),
		passphrase: z.string().trim().min(3, { message: 'Passphrase is required' }),
		...MessageMetadata,
	})
	.partial({ expiration: true });

export type MessageType = z.infer<typeof MessageSchema>;
export type CreateMessageType = z.infer<typeof CreateMessageSchema>;
