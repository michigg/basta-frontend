<template>
  <b-row>
    <b-col>
      <h5>Kommentare</h5>
    </b-col>
    <div v-for="comment in comments" class="col col-12 border">
      <h5>{{comment.title}}</h5>
      <p>{{comment.description}}</p>
    </div>
  </b-row>
</template>

<script>
  export default {
    name: "CommentsOverview",
    props: ['comments'],
  }
</script>

<style scoped>

</style>
