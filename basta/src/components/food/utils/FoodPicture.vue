<template>
  <div>
    <food-picture-upload id="pic-upload"></food-picture-upload>
    <div v-if="userFoodImage">
      <b-img :src="userFoodImage" fluid-grow alt="Fluid-Grow image"/>
    </div>
    <div v-else-if="foodImage">
      <b-img :src="foodImage.image" fluid-grow alt="Fluid-Grow image"/>
    </div>
    <div v-else><
      <b-img :src="defaultImage" fluid-grow alt="Fluid-Grow image"/>
    </div>
  </div>
</template>

<script>
  import FoodPictureUpload from "@/components/food/utils/PictureUpload";

  export default {
    name: "FoodPicture",
    components: {FoodPictureUpload},
    computed: {
      defaultImage() {
        return this.$store.getters.getDefaultImageLocation
      },
      foodImage() {
        return this.$store.getters.getDetailedFoodImage
      },
      userFoodImage() {
        return this.$store.getters.getDetailedFoodUserImage
      },
    },
  }
</script>

<style scoped>
  #pic-upload {
    position: absolute;
    right: 10px;
    top: 10px;
    margin-right: 10px;
  }
</style>
