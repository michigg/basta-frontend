<template>
  <div>
    <h5>Allergene</h5>

    <div v-if="allergens">
      <ul>
        <li v-for="allergen in allergens">{{ allergen.name }}</li>
      </ul>
    </div>

    <div v-else>
      Keine Angaben gefunden.
    </div>
  </div>
</template>

<script>
  export default {
    name: "AllergensOverview",
    props: ['allergens'],
  }
</script>

<style scoped>

</style>
