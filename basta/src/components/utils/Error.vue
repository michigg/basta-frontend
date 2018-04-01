<template>
  <b-row>
    <b-col>
      <b-row><h1>Ola</h1></b-row>
      <b-row>
        <!--TODO: BugReport Link-->
        <p>Wir müssen Ihnen leider mitteilen, dass Sie einen Fehler entdeckt haben.
          <br/>Wenn Ihnen dieser Fehler schon häufiger aufgefallen ist würden wir uns über einen Bug Report freuen.
          <br/>Ansonsten probieren Sie es doch später nochmal.
        </p>
      </b-row>
      <b-row>
        <router-link :to="{name:'home'}">Back to Home</router-link>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: "Error"
  }
</script>

<style scoped>

</style>
