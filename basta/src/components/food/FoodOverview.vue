<template>
  <b-row>
    <b-col class="food-overview">
      <div v-if="!mobile" class="row">
        <div v-for="location in locations" class="tab-menu-wrapper col col-6">
          <h3>{{ location.short }} </h3>
          <tab-menu :title="location.short" :location="location.id"></tab-menu>
        </div>
      </div>
      <div v-else class="row">
        <div v-for="location in locations" class="col col-12">
          <b-card no-body class="mt-3 rounded-0">
            <b-card-header header-tag="header" class="p-0" role="tab">
              <b-btn block class="rounded-0" href="#" v-b-toggle="location.id" variant="light">
                {{ location.short }}
              </b-btn>
            </b-card-header>
            <b-collapse :id="location.id" accordion="my-accordion" role="tabpanel">
              <b-card-body class="p-0 m-0">
                <tab-menu :title="location.short" :location="location.id"></tab-menu>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
        <div class="clearfix m-3"></div>
      </div>
    </b-col>
  </b-row>
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
        mobile: false,
      }
    },
    computed: {
      locations() {
        return this.$store.getters.getStudWuerzburgLocations;
      },
    },
    created() {
      this.addMobileChecker();
      this.$store.dispatch('loadLocations').then();
      this.$store.dispatch('loadDefaultImageLocation').then();
    },
    methods: {
      addMobileChecker() {
        this.mobile = window.innerWidth < 768;
        window.addEventListener('resize', () => {
          this.mobile = window.innerWidth < 768;
        }, true);
      },
    }
  }
</script>

<style scoped>
  .tab-menu-wrapper {
    padding: 0;
  }
</style>
