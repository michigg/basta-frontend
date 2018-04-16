<template>
  <div v-if="!mobile">
    <h5>Allergene</h5>
    <div v-if="allergens">
      Keine Angaben gefunden.
    </div>
    <div v-else>
      <ul>
        <li v-for="allergen in allergens">{{ allergen.name }}</li>
      </ul>
    </div>
  </div>
  <div v-else>
    <b-card no-body class="mb-1 rounded-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-btn block href="#" v-b-toggle.allergensBox variant="light">Allergene</b-btn>
      </b-card-header>
      <b-collapse id="allergensBox" accordion="allergensBox-accordion" role="tabpanel">
        <b-card-body>
          <div v-if="allergens">
            Keine Angaben gefunden.
          </div>
          <div v-else>
            <ul>
              <li v-for="allergen in allergens">{{ allergen.name }}</li>
            </ul>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "AllergensOverview",
    data() {
      return {mobile: false};
    },
    computed: {
      allergens() {
        return this.$store.getters.getDetailedFoodUserAllergens
      },
    },
    created() {
      this.addMobileChecker();
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

</style>
