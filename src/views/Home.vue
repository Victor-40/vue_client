<template>
  <div class="home">
   
    <HelloWorld msg="Welcome to BQAD portal "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
.home {
  /*background-image: url("./bugs.jpg");*/
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  padding-top: 30px;
}
</style>
