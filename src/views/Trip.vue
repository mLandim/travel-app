<script setup>
import { reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { geoStore } from '../stores/geonames'

// Geonames store with pinia
const geonameStore = geoStore()
const { selectedGeoData } = storeToRefs(geonameStore)

watch(selectedGeoData, (newData) => {
  console.log(newData)
  Object.assign(cityView, newData)
  })

// City info shown in page
const cityView = reactive({})

</script>
<template>
    <div class="trip-name">
        <span class="text">Visitando</span>
        <span class="trip-city">{{cityView.toponymName}}, {{cityView.countryName}}</span>
        
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

    }
    .text {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 4px;
        font-size: 0.8rem;
        color: var(--all-color-secondary);

    }
    .trip-city {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 4px;
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--all-color-primary);
        
    }
</style>