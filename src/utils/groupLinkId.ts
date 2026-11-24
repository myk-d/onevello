/** Split an id into groups of `size` characters (display only, never for copying). */
export const groupLinkId = (id: string, size = 4): string[] => {
	const groups: string[] = [];
	for (let i = 0; i < id.length; i += size) groups.push(id.slice(i, i + size));
	return groups;
};

export const buildSecretUrl = (origin: string, secretPath: string, id: string): string => `${origin}${secretPath.replace(':id', id)}`;
