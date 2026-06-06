import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { firebaseAuth, firebaseProvider } from '../config/firebase.config';

interface AuthContextValue {
	user: User | null;
	loading: boolean;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (u) => {
			setUser(u);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const signIn = async () => {
		await signInWithPopup(firebaseAuth, firebaseProvider);
	};

	const signOut = async () => {
		await firebaseSignOut(firebaseAuth);
	};

	return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
};
