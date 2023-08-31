<template>
  <a-layout class="layout">
    <a-layout-content style="padding: 0 50px">
      <div class="content">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
  import { ref } from 'vue';
  const selectedKeys = ref(['2']);
</script>
<style scoped>
  .layout{
    width:100%;
    height:100vh;
  }
  .content{
    height: 100%;
    width: 100%;
  }
</style>