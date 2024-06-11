<script lang="ts">
	import { createPersonsStore } from "$stores/persons.svelte";
    import { createQuestionsStore } from "$stores/questions.svelte";

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

<div class="textareas">
    <textarea class="textarea" bind:value={questionsValue} onchange={handleQuestionsChange}></textarea>
    <textarea class="textarea" bind:value={personsValue} onchange={handlePersonsChange}></textarea>
</div>

<button onclick={handleRandomize}>Randomize!</button>

{#if randomizedPerson && randomizedQuestion}
    <p>Tell us {randomizedPerson}: {randomizedQuestion}</p>
{/if}
