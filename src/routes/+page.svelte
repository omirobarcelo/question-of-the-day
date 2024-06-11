<script lang="ts">
	import { createPersonsStore } from "$stores/persons.svelte";
    import { createQuestionsStore } from "$stores/questions.svelte";
	import { translationStore } from "$stores/translate.svelte";
	import Header from "./Header.svelte";

    const questionsStore = createQuestionsStore();
    let questionsValue = $state(questionsStore.questions.join(`\n`));

    const personsStore = createPersonsStore();
    let personsValue = $state(personsStore.persons.join(`\n`));

    let randomizedQuestion = $state('');
    let randomizedPerson = $state('');

    function handleQuestionsChange() {
        questionsStore.put(questionsValue.split(`\n`));
    }

    function handlePersonsChange() {
        personsStore.put(personsValue.split(`\n`));
    }

    function handleRandomize() {
        randomizedQuestion = questionsStore.randomQuestion();
        randomizedPerson = personsStore.randomPerson();
    }
</script>

<style>
    .textarea {
        width: 556px;
        height: 312px;
    }
</style>

<Header></Header>

<div class="textareas">
    <textarea class="textarea" placeholder={translationStore.t('placeholderQuestions')} bind:value={questionsValue} onchange={handleQuestionsChange}></textarea>
    <textarea class="textarea" placeholder={translationStore.t('placeholderPersons')} bind:value={personsValue} onchange={handlePersonsChange}></textarea>
</div>

<button onclick={handleRandomize}>{translationStore.t('button')}</button>

{#if randomizedPerson && randomizedQuestion}
    <p>{translationStore.t('prompt')} {randomizedPerson}, {randomizedQuestion}</p>
{/if}
