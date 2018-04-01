<template>
  <div id="prices" class="">
    <h5>Preise</h5>
    <div class="student">
      Student:
      <span v-if="student">{{ student }}</span>
      <span v-else>Keine Angaben gefunden</span>
    </div>
    <div class="price-employee">
      Employee:
      <span v-if="employee">{{ employee }}</span>
      <span v-else>Keine Angaben gefunden</span>
    </div>
    <div class="price-guest">
      Guest:
      <span v-if="guest">{{ guest }}</span>
      <span v-else>Keine Angaben gefunden</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PriceOverview",
    props: ['student', 'employee', 'guest'],
  }
</script>

<style scoped>

</style>
