<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> 
<!--      <router-link :to="{path: '/startvm', params: {bisy: true}}">StartVM</router-link>-->
      <router-link :to="{path: '/startvm' }">Start VM</router-link>
      <router-link :to="{path: '/starttestset' }">Start Testset</router-link>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  display: flex
}

#nav {
  padding: 30px;
  // display: inline-block;
  width: 200px;
  background-color: #e7faf3;
  height: 200px;
  // border: 1px solid;

  a {
    font-weight: bold;
    color: #2c3e50;
    display: block;
    margin-bottom: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main {
  text-align: center;
  // border: 1px solid;
  width: 100%;
}
</style>
