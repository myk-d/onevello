import z from 'zod';

// Спільні метадані (те, що є і в формі, і в базі)
const MessageMetadata = {
	createdAt: z.string(),
	expiration: z.string(),
	oneTime: z.boolean(),
};

// 1. Схема для бази даних (Firestore)
export const MessageSchema = z.object({
	id: z.string(),
	...MessageMetadata,
	ctB64: z.string(),
	tagB64: z.string(),
	ivB64: z.string(),
	saltB64: z.string(),
	passwordSaltB64: z.string(),
	seq: z.number(),
	algo: z.string(),
	ts: z.number(),
});

// 2. Схема для форми (те, що вводить користувач)
export const CreateMessageSchema = z
	.object({
		text: z.string().trim().min(1, { message: 'Secret text is required' }),
		passphrase: z.string().trim().min(3, { message: 'Passphrase is required' }),
		...MessageMetadata,
	})
	.partial({ expiration: true });

export type MessageType = z.infer<typeof MessageSchema>;
export type CreateMessageType = z.infer<typeof CreateMessageSchema>;
