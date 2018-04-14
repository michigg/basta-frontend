<template>
  <div class="tab-menu m-0 p-1">
    <b-tabs>
      <b-tab title="Heute" active title-link-class="rounded-0">
        <day-menu :menu="dayMenu"></day-menu>
      </b-tab>
      <b-tab title="Woche" title-link-class="rounded-0">
        <week-menu :menus="weekMenus"></week-menu>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import DayMenu from '@/components/food/DayMenu'
  import WeekMenu from '@/components/food/WeekMenu'
  import axios from 'axios';
  import * as CONFIG from '../../config';

  export default {
    name: "TabMenu",
    props: ['title', 'location'],
    components: {DayMenu, WeekMenu},
    data() {
      return {
        dayMenu: {},
        weekMenus: [],
      };
    },
    created() {
      let now = new Date();
      let today_yyyymmdd = this.formatDate(now);
      now.setDate(now.getDate() + 7);
      let last_weekday_yyyymmdd = this.formatDate(now);
      axios.get(CONFIG.API_ROOT_FOOD
        .concat('/menus/?location=').concat(this.location)
        .concat('&startdate=').concat(today_yyyymmdd)
        .concat('&enddate=').concat(today_yyyymmdd))
        .then(response => {
          console.log(JSON.parse(JSON.stringify(response.data)));
          if (response.data.length == 1) {
            this.dayMenu = response.data[0];
          }
        })
        .catch(e => {
          console.error(e)
        });

      axios.get(CONFIG.API_ROOT_FOOD
        .concat('/menus/?location=').concat(this.location)
        .concat('&startdate=').concat(today_yyyymmdd)
        .concat('&enddate=').concat(last_weekday_yyyymmdd))
        .then(response => {
          // JSON responses are automatically parsed.

          console.log(JSON.parse(JSON.stringify(response.data)));
          this.weekMenus = response.data;
        })
        .catch(e => {
          console.error(e)
        });
    }, methods: {
      formatDate: function (date) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
      }
    }
  }
</script>

<style scoped>
  .tab-menu {
    margin: 5px;
    padding: 10px;
  }
</style>
