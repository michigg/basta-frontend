<template>
  <div v-if="isAuthenticated()">
    <b-card no-body class="mb-1 rounded-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-btn block href="#" v-b-toggle.commentBox variant="light">Kommentieren</b-btn>
      </b-card-header>
      <b-collapse id="commentBox" accordion="commentBox-accordion" role="tabpanel">
        <b-card-body>
          <b-form @submit="onSubmit">
            <b-form-group id="commentShort"
                          label="Überschrift, Zusammenfassung"
                          label-for="commentShort">
              <b-form-input id="commentShort"
                            type="text"
                            v-model="form.commentShort"
                            required
                            placeholder="Enter Title">
              </b-form-input>
            </b-form-group>
            <b-form-group id="commentText"
                          label="Kommentar"
                          label-for="commentText">
              <b-form-textarea id="commentText"
                               v-model="form.commentText"
                               placeholder="Enter something"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary">Speichern</b-button>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  import authentication from "../../../authentication";
  import * as CONFIG from "../../../config"

  export default {
    name: "CommentBox",
    data() {
      return {
        form: {
          commentShort: '',
          commentText: '',
        }
      };
    },
    computed: {
      foodID() {
        return this.$store.getters.getDetailedFoodID
      },
    },
    created() {
      this.getUserComment();
    },
    watch: {
      foodID: function () {
        this.getUserComment();
      },
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        if (authentication.authenticated() && this.foodID) {
          let url = CONFIG.API_ROOT_FOOD + '/meals/' + this.$route.params.id + '/comment';
          let jsonData = {
            "title": this.form.commentShort,
            "description": this.form.commentText
          };
          window.axios
            .post(url, jsonData)
            .then(response => {
              this.$store.dispatch('loadDetailedFood', {foodId: this.$route.params.id}).then();
            })
            .catch()
        }
      },
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      getUserComment: function () {
        if (authentication.authenticated() && this.foodID) {
          let url = CONFIG.API_ROOT_ACCOUNT + '/food/comments/?food_id=' + this.$route.params.id;
          window.axios
            .get(url)
            .then(response => {
              if (response.data.length > 0) {
                this.form.commentText = response.data[0].description;
                this.form.commentShort = response.data[0].title;
              }
            })
            .catch()
        }
      },
    },
  }
</script>

<style scoped>

</style>
