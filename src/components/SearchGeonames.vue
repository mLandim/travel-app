<script setup>

import axios from 'axios'
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { geoStore } from '../stores/geonames'

const store = geoStore()

const results = ref([])
// const resultsShow = computed(() => {
//     return results.filter
// })
const url = ref('http://api.geonames.org/searchJSON?q=london&maxRows=10&username=mlandim')
const searchText = ref('')
const search = async () => {
    try {
        const result = await axios.get(url.value)
        console.log(result.data)
        if (result.status===200 && 'geonames' in result.data) {
            results.value = [...result.data.geonames]
        }

    } catch (error) {
        console.error(error.message)
    }
}

const searchUpdate = () => {
    if(searchText.value.length > 3 ) {
        search()
    }
}

const selectResult = (item) => {
    store.updateGeoData(item)
    results.value = []
}

</script>
<template>
    <div class="search-geonames">
        <div class="search-input">
            <input type="text"  v-model="searchText" @keyup="searchUpdate">
        </div>
        <div class="search-results" v-if="results">
            <div class="result-item" v-for="item in results" @click="selectResult(item)">
            <div class="item-name">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .search-geonames {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        height: auto;
    }

    .search-results {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        top: 24px;
        left: 0;
        height: auto;
        width: 100%;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid var(--all-color-on-surface-light3);
        background-color: var(--all-color-surface);
    }

    .result-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 4px 0;
        cursor: pointer;
    }

    .result-item:hover {
        background-color: var(--all-color-background);
        color: var(--all-color-primary)
    }

</style>