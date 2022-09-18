import  { defineStore } from 'pinia'
import { GeoName, Coordinates } from '../utils/definitions';


interface GeoStore {
    selectedCoordinates: Coordinates
    selectedGeoData: GeoName
    userName: string
    maxResult: number
}

export const geoStore = defineStore('geoStore', {
    state: () => ({
        selectedCoordinates: {},
        selectedGeoData: {},
        userName: 'mlandim',
        maxResult: 5
        
    } as GeoStore),

    actions: {

        updateGeoData(data: GeoName): void {
            this.selectedGeoData = data
        },

        updateCoordinates(data: Coordinates): void {
            console.log('updateCoordinates')
            console.log(data)
            this.selectedCoordinates = data
        },

      


    }
})