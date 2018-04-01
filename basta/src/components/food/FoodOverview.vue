<template>
  <b-col>
    <b-row>
      <div class="col col-6" v-for="location in locations">
        <tab-menu :title="location.short" :location="location.id" :defaultImageUrl="defaultImageUrl"></tab-menu>
      </div>
    </b-row>
  </b-col>

</template>

<script>
  import TabMenu from '@/components/food/TabMenu'
  import axios from 'axios'
  import * as CONFIG from '@/config.js'

  export default {
    name: "FoodOverview",
    components: {TabMenu},
    data() {
      return {
        defaultImageUrl: '',
        locations: [],
      }
    },
    created() {
      axios.get(CONFIG.API_ROOT_FOOD.concat('/menus/locations'))
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(JSON.parse(JSON.stringify(response.data)));
          this.locations = response.data;
        })
        .catch(e => {
          console.error(e)
        });

      axios.get(CONFIG.API_ROOT_FOOD.concat('/meals/images/default'))
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(JSON.parse(JSON.stringify(response.data)));
          this.defaultImageUrl = response.data.image;
        })
        .catch(e => {
          console.error(e)
        });
    }
  }
</script>

<style scoped>

</style>
