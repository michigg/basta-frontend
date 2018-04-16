<template>
  <b-row class="bg-light text-dark m-0">
    <b-col class="pt-2">
      <h5>Bug Report</h5>
      <bug-report-formular></bug-report-formular>
    </b-col>
    <div v-for="bugReport in bugReports" class="col col-12">
      <b-card :title="bugReport.title" header-tag="header">
        <p class="card-text">
          {{bugReport.description}}
        </p>
        <b-card-footer class="text-center">
          <small>{{bugReport.category}} | {{bugReport.status}}</small>
        </b-card-footer>
      </b-card>
      <p></p>
    </div>
  </b-row>
</template>

<script>
  import BugReportFormular from "./BugReportFormular";

  export default {
    name: "BugReportOverview",
    components: {BugReportFormular},
    created() {
      this.$store.dispatch('loadBugReports').then()

    },
    computed: {
      bugReports() {
        return this.$store.getters.getBugReports;
      },
    }
  }
</script>

<style scoped>

</style>
