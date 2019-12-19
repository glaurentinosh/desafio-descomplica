<template>
<div id="app">
    <h1>Lista de Personagens</h1>
    <div v-for="char in orderedCharacters" v-bind:key="char.name" class="character flex-char"><character :name="char.name" :eyecolor="char.eye_color">
</character>
<button type="button" class="delete-char" @click="deleteChar(char)">Delete</button>
    </div>
    <div class="select-delete">
      <label for="deletingChar">Delete character: </label>
      <select id="deletingChar" v-model="selectedChar">
      <option v-for="char in orderedCharacters" v-bind:key="char.name">{{ char.name }}</option>
    </select>
      <button type="button" class="delete-specific-char" @click="deleteChar(findCharByName(selectedChar))">Delete</button>
    </div>
  </div>
</template>

<script>
import character from './components/character.vue'

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

export default {
  name: 'app',
  components: {
    character
  },
  data() {
    return {
      characters: [],
      selectedChar: null
    }
  },
  methods: {
    deleteChar(char) {
      let index = this.characters.indexOf(char)
      this.characters.splice(index, 1)
    },
    findCharByName(charName) {
      return this.characters.find( function(a){return (a.name == charName)})
    }
  },
  mounted() {
    Vue.axios.get('https://swapi.co/api/people/').then(response => (this.characters = response.data.results))
},
  computed: {
    orderedCharacters(){
      return this.characters.slice().sort( function (a,b) {
        return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
      } )
    }
  }  
}
</script>

<style>
body {
  background-image: linear-gradient(to right, #29E68B,#1EA664); 
}

h1 {
  display: flex;
  justify-content: center;
  color: #402712;
}

.character {
  border: 1px solid #000000; 
  padding: 10px 10px 10px 10px;
  background-color: #E09A11;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.flex-char {
  justify-content: center;
  flex-direction: column;
}

@media only screen and (max-width: 768px) {
  .flex-char {
    justify-content: left;
    flex-direction: row;
  }
}

.select-delete {
  border: 1px solid #000000; 
  padding: 10px 10px 10px 10px;
  background-color: #F78D07;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

p {
  margin-right: 15px;
  margin-top: 35px;
}

label {
  font-style: italic;
  font-size: 20px;
  color: #1B0F4D;
}

button {
  margin-top: 30px;
  background-color: #1B0F4D;
  height: 40px;
  width: 100px;
  font-size: 14px;
}

button.delete-char {
  background-color: #4927CC;
  color: white;
} 

button.delete-specific-char {
  background-color: #1B0F4D;
  color: white;
} 
</style>
