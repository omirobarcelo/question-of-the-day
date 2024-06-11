import { browser } from '$app/environment';
import { QUESTIONS_LOCAL_KEY } from '$lib/constants';

export function createQuestionsStore() {
	const storedQuestions = (browser ? JSON.parse(localStorage.getItem(QUESTIONS_LOCAL_KEY) ?? '[]') : []) as string[];
	let questions = $state(storedQuestions);

	return {
		get questions() {
			return questions;
		},
		randomQuestion() {
			const randomIdx = Math.floor(Math.random() * questions.length);
			return questions[randomIdx];
		},
		add: () => {
			questions = [...questions, `Question ${Math.floor(Math.random() * 100)}`];
			if (browser) {
				localStorage.setItem(QUESTIONS_LOCAL_KEY, JSON.stringify(questions));
			}
		},
		put: (updated: string[]) => {
			questions = [...updated];
			if (browser) {
				localStorage.setItem(QUESTIONS_LOCAL_KEY, JSON.stringify(questions));
			}
		}
	};
}
