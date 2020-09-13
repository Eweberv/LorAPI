<template>
  <div class="searchBar">
    <input v-model="userSearchQuery" placeholder="search a card">
    <v-btn @click="startResearch(userSearchQuery)">Search</v-btn>
    <v-img v-if="displaySearchResult" :src="searchResultImage" contain max-width="200px"></v-img>
    <div v-if="this.searchResultImage === '-1'">Not found</div>
  </div>
</template>

<script>
import cardsInfo01 from '../assets/cards/cardsInfo01.json'
import cardsInfo02 from '../assets/cards/cardsInfo02.json'
import cardsInfo03 from '../assets/cards/cardsInfo03.json'


export default {
  name: "cardSearch",
  data: function() {
    return {
      cardsInfos: [
        { cardInfo: cardsInfo01 },
        { cardInfo: cardsInfo02 },
        { cardInfo: cardsInfo03 },
      ],
      userSearchQuery: null,
      displaySearchResult: false,
      searchResultImage: null
    }
  },
  methods: {
    startResearch(cardName) {
      this.displaySearchResult = true;

      console.log("asked card:", cardName)

      for (let j = 0; j < this.cardsInfos.length; j++) {
        for (let i = 0; i < this.cardsInfos[j].cardInfo.length; i++) {
          if (cardName.toLowerCase() === this.cardsInfos[j].cardInfo[i].name.toLowerCase()) {
            console.log("associated card:", this.cardsInfos[j].cardInfo[i].cardCode)

            //link associated png and set result to it
            this.searchResultImage = require('../assets/cards/cardsPng/' + this.cardsInfos[j].cardInfo[i].cardCode + '.png');
            return;
          }
        }
      }
      //card not found
      this.searchResultImage = '-1';
      this.displaySearchResult = false;
      return 0;
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>