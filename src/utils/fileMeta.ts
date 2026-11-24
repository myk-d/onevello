import { PasswordChannel } from 'secure-channel-sdk';
import { MessageType } from '../models/Message/message';

export interface FileMeta {
	name: string;
	type: string;
	/** Bytes. Absent on secrets created before sizes were stored. */
	size?: number;
}

// File name, type and size are encrypted with the secret's passphrase (same scheme as the text) and stored as one JSON string.
export const encryptFileMeta = async (passphrase: string, meta: FileMeta): Promise<string> => {
	const pkg = await PasswordChannel.encrypt(passphrase, JSON.stringify(meta));
	return JSON.stringify(pkg);
};

// New secrets carry `fileMeta`; secrets created before it carry plain `fileName`/`fileType`.
// Call only after the text was decrypted with this passphrase, so a wrong passphrase is counted once.
export const resolveFileMeta = async (
	passphrase: string,
	message: Pick<MessageType, 'fileUrl' | 'fileMeta' | 'fileName' | 'fileType'>,
): Promise<FileMeta | undefined> => {
	if (!message.fileUrl) return undefined;

	if (message.fileMeta) {
		try {
			const parsed = JSON.parse(await PasswordChannel.decrypt(passphrase, JSON.parse(message.fileMeta)));
			if (typeof parsed?.name === 'string') return {
					name: parsed.name,
					type: typeof parsed.type === 'string' ? parsed.type : '',
					...(typeof parsed.size === 'number' ? { size: parsed.size } : {}),
				};
		} catch {
			// fall through: the file stays downloadable under a generic name
		}
		return { name: 'file', type: '' };
	}

	if (message.fileName) return { name: message.fileName, type: message.fileType ?? '' };
	return undefined;
};

// Storage object names must not reveal the original file name.
export const opaqueStorageName = (): string => `${Date.now()}_${crypto.randomUUID()}`;
