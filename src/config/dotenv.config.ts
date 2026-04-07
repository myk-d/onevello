export class DotenvConfig {
	private static instance: DotenvConfig;
	private readonly config = import.meta.env;
	private readonly envPrefix = 'VITE_APP_';

	constructor() {
		if (DotenvConfig.instance) {
			return DotenvConfig.instance;
		}
		DotenvConfig.instance = this;
	}

	get(key: ENV): string {
		const mutatedKey = key.includes(this.envPrefix) ? key : `${this.envPrefix}${key}`;
		const value = this.config[mutatedKey];
		if (!value) {
			throw new Error(`[DotenvConfig] Missing env variable: ${mutatedKey}`);
		}
		return value;
	}
}

export enum ENV {
	FIRE_API_KEY = 'FIRE_API_KEY',
	FIRE_AUTH_DOMAIN = 'FIRE_AUTH_DOMAIN',
	FIRE_PROJECT_ID = 'FIRE_PROJECT_ID',
	FIRE_STORAGE_BUCKET = 'FIRE_STORAGE_BUCKET',
	FIRE_MESSAGING_SENDER_ID = 'FIRE_MESSAGING_SENDER_ID',
	FIRE_APP_ID = 'FIRE_APP_ID',
	//
	API_URL = 'API_URL',
}

export const dotenv = new DotenvConfig();
