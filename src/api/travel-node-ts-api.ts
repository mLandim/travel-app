import axios from 'axios'

const apiBase = 'https://travel-app-node-ts.onrender.com/'

export const getCityResultsBySearch = (search: String: maxResult: Nunber = 5) => {

  try {
    let resultSearch = []
    const url = `${apiBase}api/v1/geonames/search-city/${search}?maxResult=${maxResult}`
    const result = await axios.get(url)
    console.log(result.data)
    if (result.status===200 && 'geonames' in result.data) {
      resultSearch = [...result.data.geonames]
    }

    return resultSearch

  } catch (error) {
    console.error(error.message)
  }
  
}

export const getReversedSearch = (lat: Number, lng: Number) => {
  try {
    let resultSearch = []
    const url = `${apiBase}api/v1/geonames/reversed?lat=${lat}&lng=${lng}`
    const result = await axios.get(url)
    console.log(result.data)
        
    if (result.status===200 && 'geonames' in result.data) {
      resultSearch = result.data.geonames[0]
    }

    return resultSearch

  } catch (error) {
    console.error(error.message)
  }

}
