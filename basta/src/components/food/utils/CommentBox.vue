<template>
  <div v-if="isAuthenticated()">
    <h5>Kommentare</h5>
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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import authentication from "../../../authentication";
  import * as CONFIG from "../../../config"

  export default {
    name: "CommentBox",
    props: ['foodId'],
    data() {
      return {
        form: {
          commentShort: '',
          commentText: '',
        }
      };
    },
    created() {
      this.getUserComment();
    },
    watch: {
      foodId: function () {
        this.getUserComment();
      },
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        if (authentication.authenticated() && this.foodId) {
          let url = CONFIG.API_ROOT_FOOD + '/meals/' + this.foodId + '/comment';
          let jsonData = {
            "title": this.form.commentShort,
            "description": this.form.commentText
          };
          window.axios
            .post(url, jsonData)
            .then(response => {
              this.$emit('updateFood');
            })
            .catch()
        }
      },
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      getUserComment: function () {
        if (authentication.authenticated() && this.foodId) {
          let url = CONFIG.API_ROOT_ACCOUNT + '/food/comments/?food_id=' + this.foodId;
          window.axios
            .get(url)
            .then(response => {
              console.log(response.data);
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
