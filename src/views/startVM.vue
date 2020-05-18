<template>
  <div class="startvm">
    <h3>This is a Start VM page</h3>
    <div class="free" v-if="bisy">List of bisy machines</div>
    <div v-else>Вам повезло, все машины сейчас свободны</div>
    <br>
    <p>Выберите свободную машину и снэпшот</p>
    <!-- <div>status: {{ bisy }}</div> -->
    <div class="wrapper">
      <div class="lpanel">
        <p class="headers">Virtual machines:</p>
        <div
          v-for="item in Object.keys(all_cfg)"
          :key="item"
          class="element"
          @change="clearSn"
        >
          <b-form-radio :id="item" :value="item" v-model="picked">{{ item }}</b-form-radio>
        </div>
      </div>
      <div class="rpanel">
         <p class="headers">Snapshots:</p>
        <div v-for="item in snapList" :key="item" class="element">
           <b-form-radio :id="item" :value="item" v-model="snapshot"> {{ item }}</b-form-radio>
        </div>
      </div>
    </div>
    <div v-if="showRes">
      <hr>
      Выбрана конфигурация:
      <span class="selected">{{ picked }} - {{ snapshot }}</span>
      <br><br>
      <b-button variant="outline-primary">Запустить</b-button>
    </div>
    
  </div>
</template>

<script>
// let bisy = false
export default {
  name: "startVM",
  data() {
    return {
      all_cfg: {
        "windows 10 en": ["snap1", "snap2", "snap3"],
        "windows 10 ger": ["snap2", "snap3", "snap4", "snap5"],
        "windows 7 en": ["snap1", "snap3", "snap6"],
      },
      picked: "",
      snaps: [],
      snapshot: "",
    };
  },

  props: { bisy: Boolean },
  computed: {
    snapList: function() {
      return this.all_cfg[this.picked];
    },
    showRes: function() {
      return this.picked && this.snapshot;
    },
  },
  methods: {
    clearSn() {
      this.snapshot = "";
    },
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
  /* width: 250px; */
  margin: 10px 40px 10px;
  text-align: left;
  padding: 10px 0 0 0px;
  font-weight: 500;
  font-size: 18px;
}
.element {
  margin-bottom: 5px;
}
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
