<script lang="ts">
  import { createPersonsStore } from '$stores/persons.svelte';
  import { createQuestionsStore } from '$stores/questions.svelte';
  import { translationStore } from '$stores/translate.svelte';
  import Header from './Header.svelte';

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
  .main {
    flex: 1;
    background-color: ghostwhite;
    padding: 12px 16px;

    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .content {
    width: 100%;
    max-width: 1280px;
  }

  .textarea-group {
    display: flex;
    flex-direction: row;
    gap: 24px;

    margin-bottom: 12px;
  }

  .textarea {
    height: 312px;
    padding: 8px;
    resize: none;
    font-family: monospace;
    line-height: 1.5;
  }

  .textarea:focus {
    outline: 2px solid #7ab02d;
    border-radius: 2px;
    border-color: transparent;
  }

  .textarea.questions {
    flex: 3;
  }

  .textarea.persons {
    flex: 2;
  }

  .btn {
    appearance: button;
    background-color: #000;
    background-image: none;
    border: 1px solid #000;
    border-radius: 4px;
    box-shadow:
      #fff 4px 4px 0 0,
      #000 4px 4px 0 1px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    margin: 0 5px 10px 0;
    overflow: visible;
    padding: 12px 40px;
    text-align: center;
    text-transform: none;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  .btn:focus {
    text-decoration: none;
  }

  .btn:hover {
    text-decoration: none;
  }

  .btn:active {
    box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
    outline: 0;
  }

  .btn:not([disabled]):active {
    box-shadow:
      #fff 2px 2px 0 0,
      #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }

  .result {
    margin: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .result .person {
    margin: 0;
    margin-bottom: 12px;
    font-size: 22px;
  }

  .result .question {
    margin: 0;
    font-size: 28px;
    font-weight: 500;
  }
</style>

<Header></Header>

<main class="main">
  <div class="content">
    <div class="textarea-group">
      <textarea
        class="textarea questions"
        placeholder={translationStore.t('placeholderQuestions')}
        bind:value={questionsValue}
        onchange={handleQuestionsChange}
      ></textarea>
      <textarea
        class="textarea persons"
        placeholder={translationStore.t('placeholderPersons')}
        bind:value={personsValue}
        onchange={handlePersonsChange}
      ></textarea>
    </div>

    <button class="btn" onclick={handleRandomize}>{translationStore.t('button')}</button>

    {#if randomizedPerson && randomizedQuestion}
      <div class="result">
        <p class="person">{translationStore.t('prompt')} <strong>{randomizedPerson}</strong>,</p>
        <p class="question">{randomizedQuestion}</p>
      </div>
    {/if}
  </div>
</main>
