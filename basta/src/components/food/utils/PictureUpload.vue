<template>
  <div v-if="isAuthenticated()">
    <div v-if="showFileUpload">
      <div class="fileUpload">
        <label class="inputLabel" for="file">
          <icon :name="'upload'" :scale="1" class="inputLabel-icon"></icon>
        </label>
        <input v-on:change="onSubmit" type="file" name="file" id="file" class="inputfile" ref="userFile"/>
      </div>
    </div>
    <div v-else-if="showProgressBar" class="progress-bar-wrapper">
      <b-progress :value="uploadProgress" :max="100" variant="success" height="10px"
                  class="w-100"></b-progress>
    </div>
    <div v-else class="success-response">
      <icon :name="'check-circle'" :scale="2" class="success"></icon>
    </div>
  </div>
</template>

<script>
  import * as CONFIG from '../../../config'
  import authentication from '../../../authentication'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons/check-circle';
  import 'vue-awesome/icons/upload';

  export default {
    name: "PictureUpload",
    components: {Icon},
    data() {
      return {
        showFileUpload: true,
        showProgressBar: false,
        uploadProgress: 0,
      };
    },
    watch: {
      file: function (newForm) {
        console.log('Pic Changed');
        this.onSubmit();
      },
    },
    watch: {
      file: (newFile) => {
        this.onSubmit()
      }
    },
    methods: {
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      onSubmit() {
        this.showFileUpload = false;
        this.showProgressBar = true;
        let url = CONFIG.API_ROOT_FOOD + '/meals/' + this.$route.params.id + '/image';
        let config = {
          onUploadProgress: (progressEvent) => {
            console.log(Math.round(progressEvent.loaded / progressEvent.total * 100));
            this.uploadProgress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          }
        };
        let formData = new FormData();
        console.log(this.$refs.userFile.files);
        formData.append('image', this.$refs.userFile.files[0], this.$refs.userFile.files[0].name);

        window.axios
          .post(url, formData, config)
          .then(response => {
            console.log(response.data.image);
            this.$store
              .dispatch('setUserImage', {image: response.data.image})
              .then();

            this.showProgressBar = false;
            this.showFileUpload = false;
            this.uploadProgress = 0;
            setTimeout(() => {
              this.showFileUpload = true;
            }, 5000);
          })
          .catch(e => {
            console.log(e.response);
          });
      },
    }
  }
</script>

<style scoped>
  .success {
    color: #57d25f;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label, .inputLabel {
    cursor: pointer; /* "hand" cursor */
  }

  .success-response {
    background-color: #ffffff;
    padding: 5px;
    height: 42px;
  }

  .progress-bar-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #ffffff;
    width: 60px;
  }

  .inputLabel, .progress-bar-wrapper {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    background-color: #ffffff;
  }

  .inputLabel:hover {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }

  .inputLabel-icon {
    color: #303030;
  }

  .inputfile:focus + label, .inputLabel:focus {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }
</style>
