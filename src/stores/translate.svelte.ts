import { browser } from '$app/environment';
import { LANG_LOCAL_KEY } from '$lib/constants';

export enum Language {
	ES = 'es',
	EN = 'en'
}

const translations: Record<Language, Record<string, string>> = {
	[Language.EN]: {
		title: `Question of the day`,
		button: `Randomize!`,
		prompt: `Tell us`,
		placeholderQuestions: `Write some questions...`,
		placeholderPersons: `And who should answer...`
	},
	[Language.ES]: {
		title: `Pregunta del día`,
		button: `¡Randomiza!`,
		prompt: `Dínos`,
		placeholderQuestions: `Escribe unas cuantas preguntas...`,
		placeholderPersons: `Y quién debería responder...`
	}
};

function createTranslationStore() {
	const storedLang = browser ? (localStorage.getItem(LANG_LOCAL_KEY) as Language | null) ?? Language.EN : Language.EN;
	let lang = $state(storedLang);

	return {
		get lang() {
			return lang;
		},
		changeLang: (newLang: Language) => {
			lang = newLang;
			if (browser) {
				localStorage.setItem(LANG_LOCAL_KEY, lang);
			}
		},
		t: (key: string) => {
			return translations[lang][key];
		}
	};
}

export const translationStore = createTranslationStore();
