<template>
  <div class="startvm" >
    <h3>This is a Start Testset page</h3>

    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="5" class="mb-4 mt-4">
            <b-form-input v-model="buildTag" placeholder="Enter build tag" trim></b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" class="mb-4">
            <b-form-input v-model="buildNum" placeholder="Enter build number" trim></b-form-input>
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
    </b-container>
    <hr>
    <div>{{selectedProd}}</div>
    <div>{{selectedWin}}</div>
    <div>{{selectedLang}}</div>


  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "startTestset",
  data() {
    return {
      buildTag: '',
      buildNum: '',
      selectedProd: ["CFW", "EFD.LAB", "EFD.NX", "EFD.PRO", "EFD.SE", "EFD.V5"],
      optionsProd: [
        { text: 'CFW', value: 'CFW'},
        { text: 'EFD.LAB', value: 'EFD.LAB' },
        { text: 'EFD.NX', value: 'EFD.NX' },
        { text: 'EFD.PRO', value: 'EFD.PRO' },
        { text: 'EFD.SE', value: 'EFD.SE' },
        { text: 'EFD.V5', value: 'EFD.V5' }],

      selectedWin: ["win10", "win8", "win7"],
      optionsWin: [
        { text: 'Windows 10', value: 'win10'},
        { text: 'Windows 8', value: 'win8' },
        { text: 'Windows 7', value: 'win7' }
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
      ]
    }
  },

  methods: {

  },
  mounted: function() {

  },
}
</script>
<style>
  .la {
    text-align: left;
    font-size: 18px;
  }
  .ttl {
    text-decoration: underline;
  }
</style>

