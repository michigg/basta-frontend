<template>
  <div class="p-3 border border-dark rounded bg-light text-dark">
    <div v-if="menus">
      <div v-for="menu in menus" class="menu">
        <day-menu :menu="menu" :defaultImageUrl="defaultImageUrl"></day-menu>
      </div>
    </div>
    <p v-else>Keine Daten gefunden.</p>
  </div>
</template>

<script>
  import DayMenu from '@/components/food/DayMenu'

  export default {
    name: "WeekMenu",
    props: ['menus', 'failMessage', 'defaultImageUrl'],
    components: {DayMenu: DayMenu},
  }
</script>

<style scoped>

</style>
