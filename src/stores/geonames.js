import  { defineStore } from 'pinia'

export const geoStore = defineStore('geoStore', {
    state: () => {
        return {
            selectedGeoData: null,
        }
    },

    actions: {

        updateGeoData(data) {
            this.selectedGeoData = data
        },

      


    }
})