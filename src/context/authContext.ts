import { User } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextValue {
	user: User | null;
	loading: boolean;
	isAdmin: boolean;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
