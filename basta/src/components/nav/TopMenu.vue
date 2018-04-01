<template>
  <div>
    <a id="menu-button" class="btn-link" v-on:click="this.toggleFilterMenu">
      <icon name="bars"></icon>
    </a>

    <div id="filter-menu" class="bg-blue text-center" v-bind:class="{sideBarIn: showSideBar, sideBarOut: !showSideBar}">
      <div class="mobile-nav-item-home mobile-nav-item">
        <strong>
          <router-link :to="{name: 'home'}">BaStA Menu</router-link>
        </strong>
      </div>
      <div class="mobile-nav-item">
        <router-link to="food">Food</router-link>
      </div>
      <div class="mobile-nav-item">
        <a class="menu-item" href="#">Events</a>
      </div>
      <div class="mobile-nav-item">
        <a class="menu-item" href="#">Nav</a>
      </div>
      <div class="mobile-nav-item">
        <a class="menu-item" href="#">Links</a>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons';

  export default {
    name: "TopMenu",
    components: {Icon},
    data() {
      return {
        showSideBar: false,
      }
    },
    methods: {
      toggleFilterMenu() {
        this.showSideBar = !this.showSideBar;
      },
    }
  }
</script>

<style scoped>
  #menu-button {
    top: 0;
    color: #1b1b1b;
    width: 50px;
    height: 55px;
    z-index: 5000;
    cursor: pointer;
  }

  #menu-button svg {
    transition-property: box-shadow;
    transition-duration: 0.7s, 0.7s;
  }

  #menu-button:hover svg {
    box-shadow: 0 1px 30px rgba(0, 0, 0, .9);

    transition-property: box-shadow;
    transition-duration: 0.7s, 0.7s;

  }

  #filter-menu {
    display: table;
    position: fixed;
    top: 56px;
    padding: 20px;
    z-index: 5000;
    height: 100%;
    width: 200px;
    -webkit-transition: right 0.5s; /* For Safari 3.1 to 6.0 */
    transition: right 0.5s;
  / / background-color: #51b9f5;
    /*TODO: scroll*/
  }

  #filter-menu.sideBarOut {
    right: -200px;
  }

  #filter-menu.sideBarIn {
    right: 0;
  }

  .slide-menu-tab {
    border-radius: 0px !important;
  }

  #filter-menu div .nav {
    border-bottom: 1px solid #bababa;
  }

  .mobile-nav-item {
    border-bottom: #1b1b1b solid 1px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .mobile-nav-item a {
    color: white;
    padding: 5px;
  }

</style>
