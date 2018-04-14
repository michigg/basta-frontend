<template>
  <div id="app">
    <b-container fluid>
      <b-row align-v="center" id="header" class="text-center pt-2 pb-2 mb-3 border">
        <b-col cols="2" class="text-left">
          <account-menu></account-menu>
        </b-col>
        <b-col cols="8" class="text-center">
          <!--{% block headline %}{% endblock %}-->
          <h2>
            <router-link :to="{name: 'home'}">BaStA</router-link>
          </h2>
        </b-col>
        <b-col cols="2" class="text-right">
          <top-menu></top-menu>
        </b-col>
      </b-row>

      <b-row id="content">
        <b-col cols="12">
          <router-view/>
        </b-col>
      </b-row>

      <b-row class="text-center bg-warning p-1">
        <b-col cols="12">
          Hinweis: Diese Seite dient <strong>nur</strong> zu Testzwecken.
          Wir garantieren weder die Vollständigkeit, noch
          die Korrektheit der dargestellten Daten.
        </b-col>
      </b-row>
      <footer>
        <b-row class="text-center bg-dark font-white">
          <b-col cols="6">
            <!--<p class="text-right mb-0"><a href="{{ url('impressum') }}#bug-report">Bug Report</a></p>-->
          </b-col>
          <b-col cols="6">
            <!--<p class="text-left mb-0"><a href="{{ url('impressum') }}">Impressum</a></p>-->
          </b-col>
        </b-row>
        <b-row class="text-center pb-2 bg-dark font-white p-2">
          <b-col cols="4" class="text-left">
            <small>Version 0.1.1</small>
          </b-col>
          <b-col cols="8" class="text-right">
            <small>© Copyright 2018, Michael Götz</small>
          </b-col>
        </b-row>
      </footer>
    </b-container>
  </div>
</template>

<script>
  import TopMenu from '@/components/nav/TopMenu'
  import AccountMenu from '@/components/nav/AccountMenu'
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons';

  export default {
    name: 'App',
    components: {TopMenu, AccountMenu, Icon},

  }
</script>

<style>
  #header {
    top: 0;
    height: 55px;
    position: fixed;
    width: 100%;
    z-index: 6000;
    background: white;
  }

  #content {
    margin-top: 55px;
  }

  .disabled, .disabled:hover {
    color: #999999;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }

  .bg-blue {
    background-color: #008cff;
  }

  .bg-white {
    background-color: #ffffff;
  }

  .bg-dark {
    background-color: #222222;
  }

  .bg-warning {
    background-color: #ffc107 !important;
  }

  .font-white {
    color: #ffffff;
  }

  #content {
    background-color: #343a40;
    color: white;
  }
</style>
