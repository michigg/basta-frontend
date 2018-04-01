<template>
  <div class="menu">
    <div class="p-3 border border-dark rounded bg-light text-dark">
      <div v-if="menu">
        <p>{{ menu.date | formatDateWithWeekday}}</p>
        <ul class="border">
          <li v-for="food in menu.menu" :data-food="food.id" :data-rating="food.rating" class="food-item media mb-2">
            <single-menu :food="food" :defaultImageUrl="defaultImageUrl"></single-menu>
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
    props: ['menu', 'failMessage', 'defaultImageUrl'],
    components: {SingleMenu},

  }
</script>

<style scoped>
  ul {
    padding: 0;
  }
</style>
