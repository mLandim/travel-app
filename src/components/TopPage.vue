<script setup>
import SearchGeonames from './SearchGeonames.vue';
</script>
<template>
    <div class="top-page">
        <div class="app-title">
            App Name
        </div>
        <div class="tools">
            <SearchGeonames/>
        </div>
    </div>
</template>
<style scoped>

    .top-page {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: var(--top-page-height);
        background-color: var(--all-color-surface);
        padding: 0 24px;
        border-bottom: 1px solid var(--all-color-background);
        z-index: 3;
    }

    .app-title {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--all-color-primary);
    }

@media only screen and (max-width: 800px) {
    .top-page {
        padding: 0 16px;
    }
}
</style>