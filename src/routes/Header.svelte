<script lang="ts">
	import { Language, translationStore } from "$stores/translate.svelte";
</script>

<style>
    .selected {
        font-weight: 900;
    }
</style>

<div class="header">
    <p>{translationStore.t('title')}</p>
    <div class="lang-btns">
        <button onclick={() => translationStore.changeLang(Language.EN)} class:selected={translationStore.lang === Language.EN}>EN</button>
        <button onclick={() => translationStore.changeLang(Language.ES)} class:selected={translationStore.lang === Language.ES}>ES</button>
    </div>
</div>