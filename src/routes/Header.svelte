<script lang="ts">
  import { Language, translationStore } from '$stores/translate.svelte';
</script>

<style>
  .header {
    padding: 12px 16px;
    background-color: #affc41;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    width: 100%;
    max-width: 1280px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }

  .lang-btn-group {
    width: 72px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .lang-btn-group .btn {
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: transparent;
  }

  .lang-btn-group .btn:hover {
    border-color: black;
  }

  .selected {
    font-weight: 700;
  }
</style>

<div class="header">
  <div class="content">
    <p class="title">{translationStore.t('title')}</p>
    <div class="lang-btn-group">
      <button
        class="btn"
        onclick={() => translationStore.changeLang(Language.EN)}
        class:selected={translationStore.lang === Language.EN}>EN</button
      >
      <button
        class="btn"
        onclick={() => translationStore.changeLang(Language.ES)}
        class:selected={translationStore.lang === Language.ES}>ES</button
      >
    </div>
  </div>
</div>
