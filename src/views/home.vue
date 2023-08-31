
<template>
  <div class="index">
    <div class="home-wrapper">
      <div>Product name & logo?</div>
      <div>Start now</div>
      <div>Protect Your </div>
      <div>Information</div>
      <a-button type="primary" @click="toDashboardFn">Start Now</a-button>
    </div>
  </div>

</template>
<script setup>
  import { useRouter } from "vue-router";
  const router = useRouter();
  const toDashboardFn = ()=>{
    router.push("/dashboard");
  }
</script>
<style scoped>
  .index{
    width:100%;
    height: 100%;
    position: relative;
  }
  .home-wrapper {
    font-size: 20px;
    line-height: 36px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
