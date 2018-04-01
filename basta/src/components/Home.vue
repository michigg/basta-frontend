<template>
  <div id="home">
    <b-row id="home">
      <b-col cols="12" sm="6" lg="6" xl="6">
        <icon-link :config="foodConfig"></icon-link>
      </b-col>
      <b-col cols="12" sm="6" lg="6" xl="6">
        <icon-link :config="eventsConfig"></icon-link>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="6" lg="6" xl="6">
        <icon-link :config="navConfig"></icon-link>
      </b-col>
      <b-col cols="12" sm="6" lg="6" xl="6">
        <icon-link :config="linksConfig"></icon-link>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import IconLink from '@/components/IconLink'

  export default {
    name: "home",
    components: {'IconLink': IconLink},
    data() {
      return {
        foodConfig: {link: 'food', title: 'Food', fa4Icon: 'cutlery', fa4IconSize: '4', classes: ''},
        eventsConfig: {link: '', title: 'Events', fa4Icon: 'calendar-o', fa4IconSize: '4', classes: 'disabled'},
        navConfig: {link: '', title: 'Nav', fa4Icon: 'compass', fa4IconSize: '4', classes: 'disabled'},
        linksConfig: {link: '', title: 'Links', fa4Icon: 'th-large', fa4IconSize: '4', classes: 'disabled'},
      }
    }
  }
</script>

<style scoped>

</style>
