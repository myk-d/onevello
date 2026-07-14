import z from 'zod';

const LocalizedField = z.object({
	en: z.string(),
	uk: z.string(),
});

export const BannerSchema = z.object({
	id: z.string(),
	link: z.string().url(),
	imageUrl: LocalizedField,
	text: LocalizedField,
	appName: z.string(),
	isActive: z.boolean(),
});

export type BannerType = z.infer<typeof BannerSchema>;
export type BannerLocale = keyof z.infer<typeof LocalizedField>;
