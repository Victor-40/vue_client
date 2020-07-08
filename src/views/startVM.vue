<template>
  <div class="startvm" >
    <h3>This is a Start VM page</h3>
    <div class="free" v-if="busy">
      <p>Занятые машины:</p>
    <ul class="busy">
      <li v-for="item in busy_cfg" :key="item">{{item}}</li>
    </ul>
     </div>
    <div v-else>Вам повезло, все машины сейчас свободны</div>
    <br />
    <p>Выберите свободную машину и снэпшот</p>
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
      <b-button variant="outline-primary" @click="startVm">Запустить</b-button>
    </div>

    <b-modal v-model="modalShowOk" :ok-only=true :hide-header=true @ok="upd" :no-close-on-backdrop=true>
      <p class="my-4">{{serverResponse}}</p>
      <p class="my-4">Откликается на имя <span class="selected">{{userHint}}</span></p>

    </b-modal>
    <b-modal v-model="modalShowErr" :ok-only=true :hide-header=true @ok="upd" :no-close-on-backdrop=true>
      <p class="my-err">{{serverResponse}}</p>
    </b-modal>

    <i class="fas fa-sad-tear"></i>

  </div>
</template>

<script>
import {HTTP} from '@/services/http-common'

export default {
  name: "startVM",
  data() {
    return {
      all_cfg: {},
      free_cfg: [],
      busy_cfg: [],
      picked: "",
      snaps: [],
      snapshot: "",
      modalShowOk: false,
      modalShowErr: false,
      serverResponse: '',
      // userHint: '',

    };
  },
  // props: { bisy: Boolean },
  computed: {
    snapList: function() {
      return this.picked ? this.all_cfg[this.picked]["snap"] : [];
    },
    showRes: function() {
      return this.picked && this.snapshot;
    },
    busy: function() {
      return this.busy_cfg.length > 0
    },
    userHint: function() {
      let cfgDct = {
        "Windows 10 x64": "vm-win10",
        "Windows 10 x64 German": "vm-win10-ger",
        "Windows 10 x64 Turkish": "vm-win10-tur",
        "Windows 10 x64 Jap": "vm-win10-jap",
        "Windows 7 x64": "vm-win7",
        "Windows 7 x64 Chi": "vm-win7-chi",
        "Windows 7 x64 French": "vm-win7-fre",
        "Windows 7 x64 Italian": "vm-win7-ita",
        "Windows 7 x64 Jap new": "vm-win7-jap",
        "Windows 7 x64 Rus": "vm-win7-rus",
        "Windows 8 x64": "vm-win8",
        "Windows 8 x64 German": "vm-win8-ger",
        "Windows Server 2012 R2": "vm-win2012",
        "TC1123": "AEWIC1015A"

      }
      return cfgDct[this.picked]
    }
  },   
    
  methods: {
    clearSn() {
      this.snapshot = "";
    },
    startVm() {
      let vm_cfg = {'vm': this.picked, 'snap': this.snapshot};
      HTTP.post(`startclear`, vm_cfg).then(response=> {
        console.log(response.data)
        this.serverResponse = response.data
        if (this.serverResponse.startsWith('VM')) {
          console.log('ok', this.serverResponse)
          this.modalShowOk = true
        } else {
          console.log('err', this.serverResponse)
          this.modalShowErr = true
          this.serverResponse = "Что-то пошло не так. Возможно машина уже занята"
        }

      })
    },
    upd() {
      console.log("this.updatePage")
      this.picked = ""
      this.snaps = []
      this.free_cfg = []
      this.busy_cfg = []

      HTTP.get(`cfg`).then((response) => {
        this.all_cfg = response.data
        let keys = Object.keys(this.all_cfg)
        keys.forEach(i => this.all_cfg[i]['status'] == "free" ? this.free_cfg.push(i) : this.busy_cfg.push(i))
      });
    }
  },
  mounted: function() {
    console.log("mounted");
    HTTP.get(`cfg`).then((response) => {
      this.all_cfg = response.data
      let keys = Object.keys(this.all_cfg)
       keys.forEach(i => this.all_cfg[i]['status'] == "free" ? this.free_cfg.push(i) : this.busy_cfg.push(i))
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
  padding: 10px 0 0 50px;
  font-weight: 500;
  width:270px;
  /*border-style: solid;*/
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
.busy {
  color:red;
  width: 250px;
  margin: auto;
  text-align: left;
  padding-left: 60px;
  list-style: none;
}
.my-4 {
  font-size: 18px;
}
.my-err {
  font-size: 18px;
  color: red;
}
</style>
