<script setup lang="ts">

import axios from 'axios'
import type { Ref } from   'vue'
import { ref, reactive, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { geoStore } from '../stores/geonames'
import { Coordinates, GeoName } from '../utils/definitions'
import { getCityResultsBySearch } from '../api/travel-node-ts-api'
const geonameStore = geoStore()
const { userName, maxResult } = storeToRefs(geonameStore)

const results: Ref<GeoName[]> = ref<GeoName[]>([])



const searchText = ref('')
const search = async () => {
    try {
        results.value = await getCityResultsBySearch(searchText.value)
    } catch (error) {
        console.error(error.message)
    }
}

const searchUpdate = () => {
    if(searchText.value.length > 3 ) {
        search()
    }
}

const selectResult = (item: GeoName) => {
    console.log('selectResult')
    console.log(item)
    geonameStore.updateGeoData(item)
    let newCoordinates: Coordinates = {lat: item.lat, lng: item.lng}
    geonameStore.updateCoordinates(newCoordinates)
    results.value = []
    searchText.value = item.toponymName
}

</script>
<template>
    <div class="search-geonames">
        <div class="search-input">
            <input type="text"  v-model="searchText" @keyup="searchUpdate" placeholder="Encontre uma cidade ">
            <svg  @click="searchUpdate" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/></svg>
        </div>
        <div class="search-results" v-if="results.length > 0">
            <div class="result-item" v-for="item in results" @click="selectResult(item)">
                <div class="item-name">
                    <svg height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z"/></svg>
                    <span style="margin-left: 12px" >{{item.toponymName}}, {{item.adminName1}} - {{item.countryCode}}</span>
                </div>
                <div class="item-type type-other" >
                    {{item.fclName}}
                </div>
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
        width: 100%;
        color: var(--all-color-on-surface);
    }

    .search-input {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding:8px;
        border-radius: 8px;
        border: 1px solid var(--all-color-on-surface-light3);   
        background-color: var(--all-c0l0r-surface-controls);
        color: var(--all-color-on-surface);
    }

    .search-input input {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: calc(100% - 24px);
        outline: none;
        border: none;
        background-color: var(--all-c0l0r-surface-controls);
    }

    .search-results {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        top: 40px;
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
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        cursor: pointer;
    }

    .result-item:hover {
        background-color: var(--all-color-background);
        color: var(--all-color-primary)
    }

    .item-type {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 6px;
        font-size: 0.6rem;
        border-radius: 4px;
        height: 100%;
    }

    .item-name {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .type-city {
        background-color: var(--all-color-on-surface-light);
        color: var(--all-color-on-primary);
    }

    .type-region {
        background-color: var(--all-color-on-surface-light2);
        color: var(--all-color-on-primary);
    }
    .type-other {
        background-color: var(--all-color-on-surface-light3);
        color: var(--all-color-on-primary);
    }

</style>
