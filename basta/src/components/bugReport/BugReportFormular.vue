<template>
  <div v-if="isAuthenticated()">
    <b-card no-body class="mb-1 rounded-0">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-btn block href="#" v-b-toggle.bugReportBox variant="light">Bug Report</b-btn>
      </b-card-header>
      <b-collapse id="bugReportBox" accordion="bugReportBox-accordion" role="tabpanel" :visible="showFormular">
        <b-card-body>
          <b-form @submit="onSubmit">
            <b-form-group id="commentShort">
              <!--label="Überschrift, Zusammenfassung"-->
              <!--label-for="commentShort">-->
              <b-form-input id="commentShort"
                            type="text"
                            v-model="form.bugTitle"
                            required
                            placeholder="Titel">
              </b-form-input>
            </b-form-group>
            <b-form-group id="bugCategory">
              <!--label="Kommentar"-->
              <!--label-for="bugCategory">-->
              <multiselect id="bugCategory"
                           v-model="form.category"
                           :options="categoryOptions"
                           :multiple="false"
                           :custom-label="optionLabel"
                           track-by="text"
                           placeholder="Kategorie"
              >
              </multiselect>
            </b-form-group>
            <b-form-group id="bugDescription">
              <!--label="Kommentar"-->
              <!--label-for="bugDescription">-->
              <b-form-textarea id="bugDescription"
                               v-model="form.bugDescription"
                               placeholder="Beschreibung"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">Speichern</b-button>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
  import * as CONFIG from '../../config'
  import authentication from "../../authentication";
  import Multiselect from 'vue-multiselect';
  import {validationMixin} from "vuelidate";
  import {required,} from "vuelidate/lib/validators";


  export default {
    name: "BugReportFormular",
    components: {Multiselect,},
    data() {
      return {
        form: {
          bugTitle: '',
          bugDescription: '',
          category: '',
        },
        categoryOptions: [],
        showFormular: true,
      };
    },
    mixins: [validationMixin],
    validations: {
      form: {
        bugTitle: {
          required,
        },
        bugDescription: {
          required,
        },
        category: {
          required,
        },
      }
    },
    created() {
      this.loadBugCategories();
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        let url = CONFIG.API_ROOT_BUGREPORT + '/reports/';
        let jsonData = {
          "title": this.form.bugTitle,
          "description": this.form.bugDescription,
          "category": this.form.category.value,
          "status": "REGISTERED"
        };
        window.axios
          .post(url, jsonData)
          .then(response => {
            this.$store.dispatch('loadBugReports').then();
            for (let elem in this.form) {
              console.log(elem);
              this.form[elem] = '';
            }
            this.showFormular = false;
          })
          .catch(
            // TODO: Add error handling
          )
      },
      isAuthenticated: function () {
        return authentication.authenticated();
      },
      optionLabel(option) {
        return option.text;
      },
      loadBugCategories() {
        this.categoryOptions = [];
        let url = CONFIG.API_ROOT_BUGREPORT + '/categories/';
        window.axios.get(url)
          .then(response => {
            console.log(response.data);
            let categories = response.data;
            for (const category of categories) {
              this.categoryOptions.push({text: category.name, value: category.id})
            }
          })
          .catch()
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
