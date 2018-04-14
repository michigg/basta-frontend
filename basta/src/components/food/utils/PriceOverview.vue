<template>
  <div id="prices" class="">
    <h5>Preise</h5>
    <div class="student">
      Student:
      <span v-if="prices.student">{{ prices.student }} €</span>
      <span v-else>n/a</span>
    </div>
    <div class="price-employee">
      Mitarbeiter:
      <span v-if="prices.employee">{{ prices.employee }} €</span>
      <span v-else>n/a</span>
    </div>
    <div class="price-guest">
      Gast:
      <span v-if="prices.guest">{{ prices.guest }} €</span>
      <span v-else>n/a</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PriceOverview",
    computed: {
      prices() {
        return this.$store.getters.getDetailedFoodPrices
      }
    }
  }
</script>

<style scoped>

</style>
