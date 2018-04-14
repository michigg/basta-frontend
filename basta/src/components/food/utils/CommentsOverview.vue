<template>
  <b-row class="bg-light text-dark m-0">
    <b-col class="pt-2">
      <h5>Kommentare</h5>
      <comment-box></comment-box>
    </b-col>
    <div v-for="comment in comments" class="col col-12">
      <b-card :title="comment.title">
        <p class="card-text">
          {{comment.description}}
        </p>
      </b-card>
      <p></p>
    </div>
  </b-row>
</template>

<script>
  import CommentBox from "@/components/food/utils/CommentBox";

  export default {
    name: "CommentsOverview",
    components: {
      CommentBox
    },
    computed: {
      comments() {
        return this.$store.getters.getDetailedFoodComments
      }
    },
  }
</script>

<style scoped>

</style>
