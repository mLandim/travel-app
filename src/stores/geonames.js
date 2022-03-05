import  { defineStore } from 'pinia'

export const geoStore = defineStore('geoStore', {
    state: () => {
        return {
            selectedGeoData: null,
            userName: 'mlandim',
            maxResult: 5
        }
    },

    actions: {

        updateGeoData(data) {
            this.selectedGeoData = data
        },

      


    }
})