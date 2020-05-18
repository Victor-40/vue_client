<template>
  <div class="startvm">
    <h2>This is a Start VM page</h2>
    <div class="free" v-if="bisy">List of bisy machines</div>
    <div v-else>Вам повезло, все машины сейчас свободны</div>
    <div>status: {{ bisy }}</div>
    <div class="wrapper">
      <div class="lpanel">
        <div
          v-for="item in Object.keys(all_cfg)"
          :key="item"
          class="element"
          @change="clearSn"
        >
          <label
            ><input type="radio" :id="item" :value="item" v-model="picked" />
            {{ item }}</label
          >
        </div>
      </div>
      <div class="rpanel">
        <div v-for="item in snapList" :key="item" class="element">
          <label
            ><input type="radio" :id="item" :value="item" v-model="snapshot" />
            {{ item }}</label
          >
        </div>
      </div>
    </div>
    <div v-if="showRes">
      Выбрана конфигурация:
      <span class="selected">{{ picked }} - {{ snapshot }}</span>
      <br><br>
      <button>Запустить</button>
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
  width: 250px;
  /* height: 500px; */
  background-color: lightgrey;
  margin: 10px;
  text-align: left;
  padding: 10px 0 0 30px;
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
</style>
