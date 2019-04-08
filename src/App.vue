<template>
  <div id="app">
    <GridView :grid="grid"></GridView>
  </div>
</template>
<script>
  import GridView from './components/GridView'
  import Grid from './utils/Grid'
  import settings from './settings'

  export default {
    components: { GridView },
    data: () => ({
      grid: new Grid(settings.gridSize, settings.gridSize),
    }),
  }
</script>
<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body, #root, #app {
    width: 100%;
    height: 100%;
  }

  #app {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
