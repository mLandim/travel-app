<script setup lang="ts">

import { ref, reactive, watch, onMounted, inject } from 'vue'

import { storeToRefs } from 'pinia'
import leaflet, { LatLng, Layer, LayerGroup, Map, TileLayer } from 'leaflet'
import axios from 'axios'

import { geoStore } from '../stores/geonames'
import { GeoName, Coordinates } from '../utils/definitions'
import { getReversedSearch  } from '../api/travel-node-ts-api'

const MAPBOX_KEY: string = inject('MAPBOX_KEY') ?? ''

// Geonames store with pinia
const geonameStore = geoStore()
const { selectedCoordinates   } = storeToRefs(geonameStore)

watch(selectedCoordinates, (newData: Coordinates) => {
  console.log(newData)
  Object.assign(cityView, newData)
  panMap(newData.lat, newData.lng)
})

// Mapbox access token
let accessToken = MAPBOX_KEY

// initializing map
let myMap: Map

// City info shown in page
const cityView = reactive({})

// coord of map center
const defaultLat = ref(0)
const defaultLong = ref(0)



// list of layers available for the map
const defaultLayer: TileLayer = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
  })
const lightLayer: TileLayer = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
  })
const OpenStreetMap_CH: TileLayer = leaflet.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	bounds: [[45, 5], [48, 11]]
});
const OpenStreetMap_Mapnik: TileLayer = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Object with layers for control in map
const baseLayers: any = {
  'Default': defaultLayer,
  // 'Light': lightLayer,
  // 'OpenStreet': OpenStreetMap_CH,
  // 'Oms Mapnik':OpenStreetMap_Mapnik
}

const selectedTile = ref(0)
// because only here the element map-id will be available
// calling setupMap and getGeolocation
onMounted(async () => {
  setupMap()
  // drawMap()
  getGeolocation()
})

// Geolocation data and search on geonames for city with lat, long
function getGeolocation() {
  console.log('getGeolocation')
  if ('geolocation' in navigator) {
    
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position)
      defaultLat.value = position.coords.latitude
      defaultLong.value = position.coords.longitude
      try {
	
	let cityFound: GeoName = await getReversedSearch(position.coords.latitude, position.coords.longitude)
	Object.assign(cityView, cityFound)
	geonameStore.updateGeoData(cityFound)
	let newCoordinates: Coordinates = {lat: cityFound.lat, lng: cityFound.lng}
	geonameStore.updateCoordinates(newCoordinates)
	panMap(cityFound.lat, cityFound.lng)
       
      } catch (error) {
          console.error(error.message)
      }
      
    })
  } else {
    console.log('Sem geolocalização')
  }
}

// Prepare and draw map
function setupMap() {

  console.log('setupMap')
  // myMap = leaflet.map('map-id').setView([defaultLat.value, defaultLong.value], 3)
  myMap = leaflet.map('map-id', {
    center: [defaultLat.value, defaultLong.value],
    zoom: 10,
    layers: [defaultLayer] //, lightLayer, OpenStreetMap_CH, OpenStreetMap_Mapnik
  })
  // leaflet.control.layers(baseLayers).addTo(myMap)

}

// Update center location
function panMap(lat: string, lng: string){
  myMap.flyTo([Number(lat), Number(lng)], 10, {
    duration: 0.25
  })
}


// Map tiles - deprecated
// const mapsTiles = reactive([
//   {text:'Default', tile:'mapbox/streets-v11'},
//   {text:'Light', tile:'mapbox/light-v10'},
//   {text:'Dark', tile:'mapbox/dark-v10'},
//   {text:'Satélite', tile:'mapbox/satellite-v9'},
//   {text:'Nav Day', tile:'mapbox/navigation-day-v1'},
//   {text:'Nav Night', tile:'mapbox/navigation-night-v1'}
// ])


</script>
<template>
    <!-- <div class="tiles">
        <span v-for="(tile, index) in mapsTiles"  @click="updateTile(index)">{{tile.text}}</span>
    </div> -->
    <div id="map-id"></div>
</template>
<style scoped>
.tiles {
  position: relative;
  display: flex;
  gap:8px;
  padding: 8px 0;
}

.tiles span {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: #2c3e50;
  color: #ffffff;
  cursor: pointer;
}

.tiles span:hover {
  background-color: #355f88;
}

#map-id {
  height: 100%;
  width: 100%;
  /* border: 1px solid #2c3e50; */
}
</style>
