import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import { firebaseAuth, firebaseProvider } from '../config/firebase.config';
import { AuthContext } from './authContext';

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
