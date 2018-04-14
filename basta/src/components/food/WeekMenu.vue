<template>
  <div class="p-0 bg-light text-dark">
    <div v-if="menus.length > 0">
      <div v-for="menu in menus" class="menu-wrapper">
        <day-menu :menu="menu"></day-menu>
      </div>
    </div>
    <p v-else>Keine Daten gefunden.</p>
  </div>
</template>

<script>
  import DayMenu from '@/components/food/DayMenu'

  export default {
    name: "WeekMenu",
    props: ['menus', 'failMessage'],
    components: {DayMenu: DayMenu},
  }
</script>

<style scoped>
  .menu-wrapper:first-child {
    border-top: none;
  }

  .menu-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.125);
    margin-bottom: 5px;
  }
</style>
