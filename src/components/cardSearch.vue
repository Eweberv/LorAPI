<template>
  <div class="searchContainer">
    <div class="searchBar">
      <input class="userInput" @keyup.enter="startResearch(userSearchQuery)" v-model="userSearchQuery" placeholder="search a card">
      <v-btn @click="startResearch(userSearchQuery)">Search</v-btn>
    </div>

    <v-img class="resultImg" v-if="displaySearchResult" :src="searchResultImage" contain></v-img>

    <!-- Display associated keywords for card -->
    <div v-if="displaySearchResult">
      <p v-for="item in associatedglobalKeywords" :key="item.id">
        <v-card class="cards keywordCards" max-width="500px">
          <v-card-title>{{item.name}}</v-card-title>
          <v-card-subtitle>{{item.description}}</v-card-subtitle>
        </v-card>
      </p>

    </div>

  </div>
</template>

<script>
import cardsInfo01 from '../assets/cards/cardsInfo01.json'
import cardsInfo02 from '../assets/cards/cardsInfo02.json'
import cardsInfo03 from '../assets/cards/cardsInfo03.json'
import globalInfo from '../assets/globalInfo.json'


export default {
  name: "cardSearch",
  data: function () {
    return {
      cardsInfos: [
        {cardInfo: cardsInfo01},
        {cardInfo: cardsInfo02},
        {cardInfo: cardsInfo03},
      ],
      userSearchQuery: null,
      displaySearchResult: false,
      searchResultImage: require("../assets/animations/loading image.gif"),

      cardKeywords: [],

      associatedglobalKeywords: [],
      associatedglobalforDescription: [],
      associatedglobalforLevelup: [],
      globalInfo: globalInfo,
    }
  },
  methods: {
    startResearch(cardName) {
      this.displaySearchResult = true;

      let askedCard = cardName.toLowerCase();
      console.log("asked card:", cardName)

      for (let j = 0; j < this.cardsInfos.length; j++) {
        for (let i = 0; i < this.cardsInfos[j].cardInfo.length; i++) {
          let card = this.cardsInfos[j].cardInfo[i];
          if (askedCard === card.name.toLowerCase()) {
            console.log("associated card:", this.cardsInfos[j].cardInfo[i].cardCode)

            //link associated png and set result to it
            this.searchResultImage = require('../assets/cards/cardsPng/' + this.cardsInfos[j].cardInfo[i].cardCode + '.png');
            this.associateKeywords(card);
            this.associateVocab(card);
            return;
          }
        }
      }
      //card not found
      this.$notification.error("card not found");
      this.displaySearchResult = false;
      return 0;
    },
    //find keywords corresponding to icons below card name
    associateKeywords(card) {
      this.associatedglobalKeywords = []
      this.cardKeywords = card.keywords
      for (let item in this.cardKeywords) {
        for (let keyword in this.globalInfo.keywords) {
          if (this.globalInfo.keywords[keyword].nameRef === this.cardKeywords[item]) {
            this.associatedglobalKeywords.push(this.globalInfo.keywords[keyword])
          }
        }
      }
    },
    //search and parse all words occurence in description and levelUp
    associateVocab(card) {
      this.associatedglobalVocabs = []
      this.associatedglobalforDescription = [];
      if (card.description) {
        console.log(card.description)

        var regexp = /link=.+?(?=>)/g;
        var str = card.description;
        var match, matches = [];

        while ((match = regexp.exec(str)) != null) {
          matches.push(match[0]);
        }
        for (let elem in matches) {
          this.parseDescription(elem, matches, "vocab.");
          this.parseDescription(elem, matches, "keyword.");
        }
        this.displayGlobalDescription();
      }
    },
    parseDescription(elem, matches, toFind) {
      if (matches[elem].indexOf(toFind) !== -1) {
        let res = '';
        let index = matches[elem].indexOf(toFind)
        index += toFind.length;

        while (matches[elem][index])
          res += matches[elem][index++];
        toFind === "vocab." ? this.associatedglobalforDescription.push(["vocab", res]) : this.associatedglobalforDescription.push(["keyword", res]);

        console.log(toFind, "trouvé");
        console.log(this.associatedglobalforDescription);
      }
    },
    displayGlobalDescription() {
      for (let elem in this.associatedglobalforDescription) {
        if (this.associatedglobalforDescription[elem][0] === "vocab") {
          for (let vocab in this.globalInfo.vocabTerms) {
            if (this.globalInfo.vocabTerms[vocab].nameRef === this.associatedglobalforDescription[elem][1]) {
              this.associatedglobalKeywords.push(this.globalInfo.vocabTerms[vocab])
            }
          }
        }
        else if (this.associatedglobalforDescription[elem][0] === "keyword") {
          for (let keyword in this.globalInfo.keywords) {
            if (this.globalInfo.keywords[keyword].nameRef === this.associatedglobalforDescription[elem][1]) {
              this.associatedglobalKeywords.push(this.globalInfo.keywords[keyword])
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.resultImg {
  max-width: 250px;
}

.searchContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.searchBar {
  display: flex;
  flex-direction: row;
}

.userInput {
  border-color:#cccccc;
  padding:4px;
  font-size:18px;
  text-align:left;
  border-width:2px;
  border-radius:4px;
  border-style:solid;
  color:#000000;
  text-shadow:0px 0px 0px rgba(42,42,42,.75);
  font-weight:normal;
  font-style:none;
  font-family:sans-serif;
  margin-bottom: 10px;
  margin-right: 10px;
}
.userInput:focus { outline:none; }

</style>