import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { MessageType } from '../models/Message/message';
import { NODE_ENV } from '../utils/NODE_ENV';
import { dotenv, ENV } from './dotenv.config';
import { FirebaseFactory } from './firebase.factory';

const firebaseConfig = {
	apiKey: dotenv.get(ENV.FIRE_API_KEY),
	authDomain: dotenv.get(ENV.FIRE_AUTH_DOMAIN),
	projectId: dotenv.get(ENV.FIRE_PROJECT_ID),
	storageBucket: dotenv.get(ENV.FIRE_STORAGE_BUCKET),
	messagingSenderId: dotenv.get(ENV.FIRE_MESSAGING_SENDER_ID),
	appId: dotenv.get(ENV.FIRE_APP_ID),
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseProvider = new GoogleAuthProvider();

export const firebaseCollections = {
	messages: `${NODE_ENV}_messages`,

	bannedUsers: `${NODE_ENV}_banned_users`,
	users: `${NODE_ENV}_users`,
};

export const firebaseStorageDirectories = {
	messageMedia: 'message_media',
};

export const dbMessages = new FirebaseFactory<MessageType>(firebaseFirestore, firebaseCollections.messages);

type UploadImageToStorage = (directory: string, file: File, name: string) => Promise<string>;
export const uploadImageToStorage: UploadImageToStorage = async (directory, file, name) => {
	const imageRef = ref(firebaseStorage, `${directory}/${name}`);
	await uploadBytes(imageRef, file);
	return getDownloadURL(imageRef);
};

type DeleteImageFromStorage = (refString: string) => Promise<void>;
export const deleteImageFromStorage: DeleteImageFromStorage = async (refString) => {
	try {
		const fileRef = ref(firebaseStorage, refString);
		return deleteObject(fileRef);
	} catch (error) {
		console.log(error);
		return;
	}
};
