<template>
  <div class="grid">
    <div class="row" v-for="(row, index) in rows" :key="`row-${index}`">
      <GridCell
        v-for="cell in row"
        :key="`cell-${cell.x}.${cell.y}`"
        :count="cell.count"
        :updated="cell.updated"
        :success="cell.success"
        @click.native="() => cellClicked(cell)"
      ></GridCell>
    </div>
  </div>
</template>
<script>
  import GridCell from './GridCell'
  import settings from '../settings'

  export default {
    components: { GridCell },
    props: {
      grid: {
        required: true,
      },
    },
    data: () => ({
      rows: [],
      updating: false,
    }),
    methods: {
      updateLinkedCells (targetCell) {
        const linkedCells = this.grid.getLinkedCells(targetCell)

        linkedCells.forEach(cell => cell.count++)

        return this.grid.triggerUpdateAnimation(linkedCells, settings.animationSpeed * 1000)
      },
      updateSuccessCells (cells) {
        cells.forEach(cell => cell.count = 0)

        return this.grid.triggerSuccessAnimation(cells, settings.animationSpeed * 1000)
      },
      async cellClicked (cell) {
        if (this.updating) {
          return
        }
        this.updating = true

        const updateAnimation = this.updateLinkedCells(cell)
        const successCells = this.grid.getSuccessCells(settings.minimalSequenceLength)

        await updateAnimation
        await this.updateSuccessCells(successCells)

        this.updating = false
      },
    },
    created () {
      this.rows = this.grid.rows
    },
  }
</script>
<style lang="scss" scoped>
  .row {
    display: flex;
  }
</style>
