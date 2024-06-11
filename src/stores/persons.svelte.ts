import { browser } from '$app/environment';
import { PERSONS_LOCAL_KEY } from '$lib/constants';

export function createPersonsStore() {
  const storedPersons = (browser ? JSON.parse(localStorage.getItem(PERSONS_LOCAL_KEY) ?? '[]') : []) as string[];
  let persons = $state(storedPersons);

  return {
    get persons() {
      return persons;
    },
    randomPerson() {
      const randomIdx = Math.floor(Math.random() * persons.length);
      return persons[randomIdx];
    },
    put: (updated: string[]) => {
      persons = [...updated];
      if (browser) {
        localStorage.setItem(PERSONS_LOCAL_KEY, JSON.stringify(persons));
      }
    }
  };
}
