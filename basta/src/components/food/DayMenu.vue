<template>
  <div class="menu">
    <div class="p-1 bg-light text-dark">
      <div v-if="menu.date">
        <p>{{ menu.date | formatDateWithWeekday}}</p>
        <ul class="">
          <li v-for="food in menu.menu" :data-food="food.id" :data-rating="food.rating" class="food-item media mb-2">
            <single-menu :food="food"></single-menu>
          </li>
        </ul>
      </div>
      <div v-else>
        <p> Keine Daten vorhanden.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import SingleMenu from '@/components/food/SingleFood'

  export default {
    name: "DayMenu",
    props: ['menu', 'failMessage'],
    components: {SingleMenu},

  }
</script>

<style scoped>
  .menu, ul {
    padding: 0;
  }

</style>
