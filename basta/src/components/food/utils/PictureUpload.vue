<template>
  <div v-if="isAuthenticated()">
    <h4>Bilder</h4>
    <p>Bild senden</p>
    <b-form @submit="onSubmit">
      <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Choose a file..."></b-form-file>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
  import * as CONFIG from '../../../config'
  import authentication from '../../../authentication'

  export default {
    name: "PictureUpload",
    props: ['image'],
    data() {
      return {
        form: {
          file: '',
        }
      };
    },
    methods: {
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      onSubmit(evt) {
        evt.preventDefault();
        var formData = new FormData();
        console.log(this.form.file);
        // append Blob/File object
        formData.append('image', this.form.file, this.form.file.name);

        window.axios.post(CONFIG.API_ROOT_FOOD
          .concat('/meals/').concat(this.$route.params.id).concat('/image'), formData)
          .then(response => {
            // JSON responses are automatically parsed.
            this.$emit('updateImage');
          })
          .catch(e => {
            console.log(JSON.parse(JSON.stringify(e.response)));
          });
      },
    }
  }
</script>

<style scoped>

</style>
