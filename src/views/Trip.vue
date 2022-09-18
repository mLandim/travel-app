<script setup lang="ts">
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { geoStore } from '../stores/geonames'
import {  GeoName } from '../utils/definitions'
// Geonames store with pinia
const geonameStore = geoStore()
const { selectedGeoData } = storeToRefs(geonameStore)

</script>

<template>
    <div class="trip-name">
        <span class="text">Visitando</span>
        <span class="trip-city">{{selectedGeoData.toponymName}}, {{selectedGeoData.countryName}}</span>
        <div class="city-tags">
            <span>população {{selectedGeoData.population}}</span>
            <span>{{selectedGeoData.fclName}}</span>
            <span>lat {{selectedGeoData.lat}} : lng {{selectedGeoData.lng}}</span>
        </div>
        
    </div>
</template>
<style scoped>
    .trip-name {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 32px;
        padding: 8px 0;
        margin-top: 8px;

    }
    .text {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 4px 0;
        font-size: 0.7rem;
        color: var(--all-color-secondary);

    }
    .trip-city {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 4px;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--all-color-primary);
        
    }

    .city-tags {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: auto;
        height: auto;
        padding: 8px 0;
    }

    .city-tags span {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--all-color-on-surface-light4);
        border-radius: 4px;
        padding: 4px 6px;
        font-size: 0.6rem;
        margin-right: 4px;
    }
</style>