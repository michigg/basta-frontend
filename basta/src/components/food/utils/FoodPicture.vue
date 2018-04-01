<template>
  <div v-if="userFoodImage">
    <b-img :src="userFoodImage" fluid-grow alt="Fluid-Grow image"/>
  </div>
  <div v-else-if="image">
    <b-img :src="image" fluid-grow alt="Fluid-Grow image"/>
  </div>
  <div v-else>
    <b-img img :src="defaultImage" fluid-grow alt="Fluid-Grow image"/>
  </div>
</template>

<script>
  import * as CONFIG from '../../../config'

  export default {
    name: "FoodPicture",
    props: ['image', 'userFoodImage'],
    data() {
      return {
        defaultImage: '',
      };
    },
    created() {
      window.axios
        .get(CONFIG.API_ROOT_FOOD.concat('/meals/images/default'))
        .then(response => {
          console.log(JSON.parse(JSON.stringify(response.data)));
          this.defaultImage = response.data.image;
        })
        .catch(e => {
        });
    },
  }
</script>

<style scoped>

</style>
