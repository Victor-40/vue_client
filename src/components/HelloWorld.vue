<template>
  <div class="hello">
    <div class="container">
      <h1>{{msg}}</h1>
   
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mem {
  /* color: white; */
  font-size: 48px;
}
.container {
  width: 90wh;
  color: aquamarine;
  padding-left: 0;
  margin: auto;

  height: 100vh;
}
</style>
