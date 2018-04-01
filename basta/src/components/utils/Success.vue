<template>
  <b-row>
    <b-col>
      <b-row><h1>Success</h1></b-row>
      <b-row>
        <!--TODO: BugReport Link-->
        <p>Viel Spass wünscht dir das BaStA Team</p>
      </b-row>
      <b-row>
        <router-link :to="{name:'home'}">Back to Home</router-link>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "Success"
  }
</script>

<style scoped>

</style>
