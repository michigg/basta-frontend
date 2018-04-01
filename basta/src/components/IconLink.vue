<template>
  <div class="card">
    <router-link :to="{name: config.link}" :class="config.classes">
      <!--<a :href="config.link" :class="config.classes">-->
      <div class="card-body">
        <h4 class="card-title text-center">
          <icon :name="config.fa4Icon" :scale="config.fa4IconSize"></icon>
        </h4>
        <p v-if="this.config.title" class="text-center">{{ this.config.title }}</p>
      </div>
      <!--</a>-->
    </router-link>
  </div>
</template>

<script>
  import Icon from 'vue-awesome/components/Icon'
  import 'vue-awesome/icons';

  export default {
    name: "IconLink",
    props: ['config'],
    components: {Icon},
    data() {
      return {
        fa4Icon: this.config.fa4Icon,
      }
    }
  }
</script>

<style scoped>
  .disabled, .disabled:hover {
    color: #999999;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }
</style>
