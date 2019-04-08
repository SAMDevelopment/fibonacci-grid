<template>
  <div
    class="cell"
    :class="{ updated, success }"
    :style="{ transitionDuration: `${animationSpeed}s` }"
  >
    {{ currentCount }}
  </div>
</template>
<script>
  import settings from '../settings'

  export default {
    props: {
      count: {
        type: Number,
        required: true,
      },
      updated: {
        type: Boolean,
        required: true,
      },
      success: {
        type: Boolean,
        required: true,
      },
    },
    data: () => ({
      currentCount: 0,
      animationSpeed: settings.animationSpeed,
    }),
    watch: {
      updated (newValue) {
        if (newValue === true) {
          this.updateCount()
        }
      },
      success (newValue) {
        if (newValue === true) {
          this.updateCount()
        }
      },
    },
    methods: {
      updateCount () {
        this.currentCount = this.count
      },
    },
  }
</script>
<style lang="scss">
  .cell {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
    height: 15px;
    border-top: 1px solid black;
    border-left: 1px solid black;
    background-color: white;
    transition-property: background-color;
    transition-timing-function: linear;
    font-size: 10px;
    cursor: pointer;
    user-select: none;

    &:last-child {
      border-right: 1px solid black;
    }

    .row:last-child & {
      border-bottom: 1px solid black;
    }

    &.updated {
      background-color: yellow;
    }

    &.success {
      background-color: green;
    }
  }
</style>
