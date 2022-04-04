<template>
  <div class="chart-container">
    <chart height="50%" width="50%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/Keyboard'

export default {
  name: 'KeyboardChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 50%;
  height: calc(100vh - 84px);
}
</style>

