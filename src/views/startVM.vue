<template>
  <div class="startvm">
    <h3>This is a Start VM page</h3>
    <div class="free" v-if="bisy">List of bisy machines</div>
    <div v-else>Вам повезло, все машины сейчас свободны</div>
    <br />
    <p>Выберите свободную машину и снэпшот</p>
    <!-- <div>status: {{ bisy }}</div> -->
    <div class="wrapper">
      <div class="lpanel">
        <p class="headers">Virtual machines:</p>
        <div
          
          v-for="item in free_cfg"
          :key="item"
          class="element"
          @change="clearSn"
        >
          <b-form-radio :id="item" :value="item" v-model="picked">{{
            item
          }}</b-form-radio>
        </div>
      </div>
      <div class="rpanel">
        <p class="headers">Snapshots:</p>
        <div v-for="item in snapList" :key="item" class="element">
          <b-form-radio :id="item" :value="item" v-model="snapshot">
            {{ item }}</b-form-radio
          >
        </div>
      </div>
    </div>
    <div v-if="showRes">
      <hr />
      Выбрана конфигурация:
      <span class="selected">{{ picked }} - {{ snapshot }}</span>
      <br /><br />
      <b-button variant="outline-primary">Запустить</b-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

// let bisy = false
export default {
  name: "startVM",
  data() {
    return {
      all_cfg: {},
      // free_cfg: [],
      busy_cfg: {},
      picked: "",
      snaps: [],
      snapshot: "",
    };
  },

  props: { bisy: Boolean },
  computed: {
    snapList: function() {
      return this.picked ? this.all_cfg[this.picked]["snap"] : [];
    },
    showRes: function() {
      return this.picked && this.snapshot;
    },
    free_cfg: function() {
      console.log("free_cfg")
      // let keys = Object.keys(this.all_cfg)
      // console.log(keys)
      // console.log(this.all_cfg["Windows 10 x64"].get('status'))
      // for (let i in keys) {
      //   console.log(this.all_cfg[i]["status"])
      // }

      // return Object.keys(this.all_cfg).filter(function(i)  {return this.all_cfg[i]["status"] == "free"})
      return ["111", "222"]
    }
  },   
    
  
  methods: {
    clearSn() {
      this.snapshot = "";
    },
  },
  mounted: function() {
    console.log("mounted");
    axios.get("http://rum-cherezov-dt:5000/api/cfg").then((response) => {
      // console.log(response.data);
      this.all_cfg = response.data
      let keys = Object.keys(this.all_cfg)
       keys.forEach(i => console.log(this.all_cfg[i]['status']))
      // console.log(this.all_cfg["Windows 10 x64"]['status'])
      // Object.keys(this.all_cfg).forEach(function(i) {console.log(this.all_cfg[i])})
      // Object.keys(this.all_cfg).forEach(function(i) {if (this.all_cfg[i]["status"] == "free") {this.free_cfg.push(i)}})      
    });
    
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
}
.lpanel,
.rpanel {
  margin: 10px 40px 10px;
  text-align: left;
  padding: 10px 0 0 0px;
  font-weight: 500;
}
/* .element {
  margin-bottom: 5px;
} */
.lb {
  padding-left: 5px;
}
.selected {
  color: green;
  font-size: 20px;
}
.headers {
  text-decoration: underline;
}
</style>
