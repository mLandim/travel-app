<script setup lang="ts">

import { ref, reactive } from 'vue'
import leaflet, { LatLng, Layer, LayerGroup, Map, TileLayer } from 'leaflet'
import { onMounted } from 'vue';

import { storeToRefs } from 'pinia'
import { geoStore } from '../stores/geonames'

const store = geoStore()
const { selectedGeoData } = storeToRefs(store)

let myMap: Map
let accessToken = 'pk.eyJ1IjoibWxhbmRpbSIsImEiOiJjbDBhOWRodXQwa3kwM3BwOXQxcHZ4anM4In0.EI-5ZLkyEb3vS2Pu7ZddIg'

console.log(accessToken)




const defaultLat = ref(0)
const defaultLong = ref(0)

const mapsTiles = reactive([
  {text:'Default', tile:'mapbox/streets-v11'},
  {text:'Light', tile:'mapbox/light-v10'},
  {text:'Dark', tile:'mapbox/dark-v10'},
  {text:'Satélite', tile:'mapbox/satellite-v9'},
  {text:'Nav Day', tile:'mapbox/navigation-day-v1'},
  {text:'Nav Night', tile:'mapbox/navigation-night-v1'}
])

const defaultLayer: TileLayer = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWxhbmRpbSIsImEiOiJjbDBhOWRodXQwa3kwM3BwOXQxcHZ4anM4In0.EI-5ZLkyEb3vS2Pu7ZddIg'
  })
const lightLayer: TileLayer = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: accessToken
  })
const OpenStreetMap_CH = leaflet.tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	bounds: [[45, 5], [48, 11]]
});
const OpenStreetMap_Mapnik = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const baseLayers: any = {
  'Default': defaultLayer,
  'Light': lightLayer,
  // 'OpenStreet': OpenStreetMap_CH,
  // 'Oms Mapnik':OpenStreetMap_Mapnik
}

const selectedTile = ref(0)
onMounted(async () => {
  setupMap()
  // drawMap()
  getGeolocation()
})


// Geolocation data
function getGeolocation() {
  console.log('getGeolocation')
  if ('geolocation' in navigator) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      defaultLat.value = position.coords.latitude
      defaultLong.value = position.coords.longitude
      panMap()
    })
  } else {
    console.log('Sem geolocalização')
  }
}

// Draw map
function setupMap() {

  console.log('setupMap')
  // myMap = leaflet.map('map-id').setView([defaultLat.value, defaultLong.value], 3)
  myMap = leaflet.map('map-id', {
    center: [defaultLat.value, defaultLong.value],
    zoom: 10,
    layers: [defaultLayer, lightLayer, OpenStreetMap_CH, OpenStreetMap_Mapnik]
  })
  leaflet.control.layers(baseLayers).addTo(myMap)
}




// Update location
function panMap(){
  myMap.flyTo([defaultLat.value, defaultLong.value], 13)
  // myMap.panTo([defaultLat.value, defaultLong.value])
  // myMap.setZoom(5)
}

// function updateTile(tile) {
//   selectedTile.value = tile
//   drawMap()
// }
// function drawMap() {
//   console.log('drawMap')
//   leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: mapsTiles[selectedTile.value].tile,
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoibWxhbmRpbSIsImEiOiJjbDBhOWRodXQwa3kwM3BwOXQxcHZ4anM4In0.EI-5ZLkyEb3vS2Pu7ZddIg'
//   }).addTo(myMap)
// }


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