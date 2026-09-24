import { dotenv, ENV } from '../config/dotenv.config';

export const ADMIN_EMAILS = (dotenv.getOptional(ENV.ADMIN_EMAILS) ?? '')
	.split(',')
	.map((email) => email.trim().toLowerCase())
	.filter(Boolean);

export const isAdminEmail = (email: string | null | undefined): boolean => !!email && ADMIN_EMAILS.includes(email.toLowerCase());
