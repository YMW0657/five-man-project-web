<template>
  <div class="lists">
    <div class="list" v-for="item in scams" :key="item.id">
      <div class="logo">
        LOGO
      </div>
      <div class="info">
        <div>{{ item.title }}</div>
        <div><a :href="item.href">{{ item.href }}</a></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {scams} from "@/utils/index";
</script>
<style scoped>
.lists{
  padding:24px;
}
  .lists .list{
    display:flex;
    color: #222C28;
    border-bottom: 1px solid #d9d9d9;
    padding:12px;
  }
  .lists .list .logo{
    width: 56px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border: 1px solid #d9d9d9;
  }
  .lists .list .info{
    display: flex;
    flex-direction: column;
    line-height: 28px;
    font-size: 18px;
    justify-content: space-around;
    margin-left: 24px;
  }
</style>