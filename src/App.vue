<script setup lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import TopPage from './components/TopPage.vue';
import MapSystem from './components/MapSystem.vue';
import Trip from './views/Trip.vue';



</script>

<template>

  <TopPage/>

  <div class="container-view">

    <div class="main-content">
      <Trip/>
    </div>
    <div class="map-content">
      <MapSystem/>
    </div>
    

  </div>
  
</template>

<style>

:root {
 
  --all-color-primary: #1454c4;
  --all-color-secondary: #0ABCD1;

  --all-color-background: #F4F8FF;
  --all-color-surface: #FFFFFF;

  --all-color-error: #B00020;
  --all-color-success: #00875A;
  --all-color-warning: #FFC400;

  --all-color-on-background: #1D2935;
  --all-color-on-surface: #1D2935;
  --all-color-on-surface-light: #3A4C5F;
  --all-color-on-surface-light2: #607d8b;
  --all-color-on-surface-light3: #798FA5;
  

  --all-color-on-primary: #FFFFFF;
  --all-color-on-secondary: #1D2935;

  --all-color-on-success: #FFFFFF;
  --all-color-on-warning: #1D2935;
  --all-color-on-error: #FFFFFF;
  

  --top-page-height: 80px;

}

* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  color: var(--all-color-on-surface);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.container-view{
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: calc(100vh - var(--top-page-height));
  
}

.main-content {
  position: relative;
  display: flex;
  width: 40%;
  height: calc(100vh - var(--top-page-height));
  padding: 24px;
  overflow-y: auto;
  box-shadow: 0px 1px 22px -12px var(--all-color-on-surface);
  z-index: 2;

}
.map-content {
  position: absolute;
  display: flex;
  top:0;
  left: 40%;
  width: 60%;
  height: calc(100vh - var(--top-page-height));
  z-index: 1;
}


@media only screen and (max-width: 800px) {

  .container-view{
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: calc(100vh - var(--top-page-height));
    
  }

  .main-content {
    width: 100%;
    height: 66%;
    padding: 16px;

  }

  .map-content {
    width: 100%;
    height: 34%;
    left: 0;
  }
}
</style>
