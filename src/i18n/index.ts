import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import uk from './locales/uk';

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			uk: { translation: uk },
		},
		fallbackLng: 'en',
		supportedLngs: ['en', 'uk'],
		detection: {
			order: ['localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupLocalStorage: 'i18nextLng',
		},
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
