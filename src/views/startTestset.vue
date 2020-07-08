<template>
  <div class="startvm" >
    <h3>This is a Start Testset page</h3>

    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="8" class="mb-4 mt-4">
            <b-form-input v-model="dirName" placeholder="Enter setup directory name" trim></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="la">
          <b-form-group label="Select products:" class="ttl">
            <b-form-checkbox
                    v-for="option in optionsProd"
                    v-model="selectedProd"
                    :key="option.value"
                    :value="option.value"
                    name="flavour-3a"
            >
              {{ option.text }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <b-col cols="3" class="la">
          <b-form-group label="Select Windows:" class="ttl">
            <b-form-checkbox
                    v-for="option in optionsWin"
                    v-model="selectedWin"
                    :key="option.value"
                    :value="option.value"
                    name="flavour-3a"
            >
              {{ option.text }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>

        <b-col cols="3" class="la">
          <b-form-group label="Select language:" class="ttl">
            <b-form-checkbox
                    v-for="option in optionsLang"
                    v-model="selectedLang"
                    :key="option.value"
                    :value="option.value"
                    name="flavour-3a"
            >
              {{ option.text }}
            </b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="la">
          <b-button variant="outline-primary" @click="selectedProd = []">Unselect</b-button>
        </b-col>
        <b-col cols="3" class="la">
          <b-button variant="outline-primary" @click="selectedWin = []">Unselect</b-button>
        </b-col>
        <b-col cols="3" class="la">
          <b-button variant="outline-primary" @click="selectedLang = []">Unselect</b-button>
        </b-col>
      </b-row>

      <hr>
      <b-row class="text-left">
        <b-col  class="myfont">
          <b-form-group label="Select subdirectory for search">
            <b-form-radio-group
                    id="radio-group-1"
                    v-model="selectedSubDir"
                    :options="options"
                    name="radio-options"
                    stacked
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <div v-show="dirName">
      <b-row class="text-left">
        <b-col>
          <b-button variant="outline-primary" @click="findSetups">Find setups</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="myfont">
          {{countSetups}} Setup(s) founded
          <div v-if="showSpinner">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>

          <div class="text-left">
            <ul>
              <li v-for="item in respCfg" :key="item">{{item}}</li>
            </ul>
          </div>

        </b-col>
      </b-row>
      <b-row class="text-left">
        <b-col>
          <b-button variant="outline-primary" @click="makeXls">make XLS config</b-button>
        </b-col>
      </b-row>
      <b-row >
        <b-col class="myfont">
          {{cfgCount}} Configuration(s) added to XLS config
        </b-col>
      </b-row>
      <div v-if="showSpinnerXls">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <b-row class="text-left">
        <b-col>
          <b-button variant="outline-primary" @click="startTestset">start Testset</b-button>
        </b-col>
      </b-row>
      </div>

    </b-container>
    <br>
    <br>
    <br>



  </div>
</template>

<script>
import axios from "axios";
// let path = require("path")

export default {
  name: "startTestset",
  data() {
    return {
      apiPath: "http://rum-cherezov-dt:5001/api",
      dirName: '',
      selectedProd: ["CFW", "EFD.LAB", "EFD.NX", "EFD.PRO", "EFD.SE", "EFD.V5"],
      optionsProd: [
        { text: 'CFW', value: 'CFW'},
        { text: 'EFD.LAB', value: 'EFD.LAB' },
        { text: 'EFD.NX', value: 'EFD.NX' },
        { text: 'EFD.PRO', value: 'EFD.PRO' },
        { text: 'EFD.SE', value: 'EFD.SE' },
        { text: 'EFD.V5', value: 'EFD.V5' }],

      selectedWin: ["10", "8", "7"],
      optionsWin: [
        { text: 'Windows 10', value: '10'},
        { text: 'Windows 8', value: '8' },
        { text: 'Windows 7', value: '7' }
      ],
      selectedLang: [
        "English",
        "Chinese",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Russian",
        "Turkish"],
      optionsLang: [
        { text: 'English', value: 'English'},
        { text: 'Chinese', value: 'Chinese'},
        { text: 'French', value: 'French'},
        { text: 'German', value: 'German'},
        { text: 'Italian', value: 'Italian'},
        { text: 'Japanese', value: 'Japanese'},
        { text: 'Russian', value: 'Russian'},
        { text: 'Turkish', value: 'Turkish'},
      ],
      showSpinner: false,
      showSpinnerXls: false,
      fullCfg: [],
      cfgCount: 0,
      countSetups: 0,
      setupParams: {},
      vs2017: false,
      respCfg: {},
      // forXls: {},
      selectedSubDir: '',
      options: [
        { text: '\\', value: '' },
        { text: '_Internal', value: '_Internal' },
        { text: '_Main', value: '_Main'}

      ]
    }
  },

  methods: {
    findSetups() {
      // let pathSetup = path.join(this.apiPath, "findsetups");
      const pathSetup = this.apiPath + '/' + 'findsetups';
      // console.log(pathSetup)
      // showParam = true;
      this.setupParams.dirname = this.dirName;
      // this.setupParams.tag = this.buildTagClear;
      this.setupParams.subdir = this.selectedSubDir;
      this.setupParams.products = this.selectedProd;
      this.setupParams.vs2017 = this.vs2017;

      this.showSpinner = true;
      this.cfgCount =0;
      axios.post(pathSetup, this.setupParams).then(response => {
        this.showSpinner = false;
        this.respCfg = response.data;
        // console.log( this.respCfg );
        this.countSetups = this.respCfg.length;

      });

    },
    makeXls() {
      // const path = "http://rum-cherezov-dt:5001/api/makexls";
      const pathXls = this.apiPath + '/' + 'makexls';
      const paramsXls = {setups: this.respCfg, lang: this.selectedLang, win: this.selectedWin}
      this.showSpinnerXls = true;
      axios
              .post(pathXls, paramsXls)
              .then(res => {
                this.showSpinnerXls = false;
                this.fullCfg = res.data;
                this.cfgCount = this.fullCfg.length;
              })
              .catch(error => {
                // eslint-disable-next-line
                console.error(error);
              });
    },
    startTestset() {
      const pathStart = this.apiPath + '/' + 'start_testset';
      axios
          .get(pathStart)
          .then(response  => {
            console.log(response.data);
          })
    }
  }
}
</script>
<style>
  .myfont {
    font-size: 18px;
  }
  .la {
    text-align: left;
    font-size: 18px;
  }
  .ttl {
    text-decoration: underline;
  }
  b-container {
    margin-left: 1000px;
  }
</style>

