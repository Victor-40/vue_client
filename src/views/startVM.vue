<template>
  <div class="startvm">
    <h2>This is a Start VM page</h2>
    <div class="free" v-if="bisy">List of bisy machines</div>
    <div v-else>Вам повезло, все машины сейчас свободны</div>
    <div>status: {{bisy}}</div>
  </div>
</template>



<script>

// let bisy = false
export default {
  name: "startVM",
 
  props: {bisy: Boolean}
 
};
</script>

<style>
</style>
