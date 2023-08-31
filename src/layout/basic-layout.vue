<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @click="handleMenuClick"
      >
        <a-menu-item key="/">main</a-menu-item>
        <a-menu-item key="dashboard">dashboard</a-menu-item>
        <a-menu-item key="quiz">quiz</a-menu-item>
        <a-menu-item key="scam">scam</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="content">
        <router-view></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import { useRouter, useRoute } from "vue-router";
  const router = useRouter();
  const route = useRoute();
  const selectedKeys = ref(['dashboard']);
  // 处理菜单项点击事件
  const handleMenuClick = (key) => {
    selectedKeys.value = [key];
    router.push(key.key);
  };
  onMounted(()=>{
    console.log(route);
    selectedKeys.value = [route.name];
  })
</script>
<style scoped>
  .content{
    height: calc(100vh - 64px);
    overflow: auto;
  }
</style>