<template>
  <div>
    <div class="categoryButtons">
      <v-btn class="categoryButton" depressed color="primary" @click="swichActiveComponent('vocab')">vocab terms</v-btn>
      <v-btn class="categoryButton" depressed color="primary" @click="swichActiveComponent('keywords')">keywords</v-btn>
      <v-btn class="categoryButton categoryButtonLast" depressed color="primary" @click="swichActiveComponent('regions')">regions</v-btn>
    </div>

    <cardSearch></cardSearch>

    <!--<button @click="mylog(activeComponent)">coucoubtn</button>-->
    <div v-if="activeComponent==='vocab'" class="cardsWrapper">
      <div>
        <p v-for="item in globalInfo.vocabTerms" :key="item.id">
          <v-card v-if="item.description !== ' '" class="cards vocabCards" max-width="500px">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>{{item.description}}</v-card-subtitle>
          </v-card>
        </p>
      </div>
    </div>

    <div v-if="activeComponent==='keywords'" class="cardsWrapper">
      <div>
        <p v-for="item in globalInfo.keywords" :key="item.id">
          <v-card v-if="item.description !== ' ' && item.description" class="cards keywordCards" max-width="500px">
            <v-card-title>{{item.name}}</v-card-title>
            <v-card-subtitle>{{item.description}}</v-card-subtitle>
          </v-card>
        </p>
      </div>
    </div>

    <div v-if="activeComponent==='regions'" class="cardsWrapper">
      <div>
        <p v-for="item in globalInfo.regions" :key="item.id">
          <v-card class="cards regionCards">
            <img :src="item.iconAbsolutePath" class="regionIcons"/>
            <v-card-title>{{item.name}}</v-card-title>
          </v-card>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import globalInfo from '../assets/globalInfo.json'
import cardSearch from "@/components/cardSearch";

export default {
  name: "frontPage",
  components: {
    cardSearch
  },
  data: function() {
    return {
      riotApiKey: "c8b45529-62d7-4503-bf0d-cb8da998dcaf",
      globalInfo: globalInfo,
      activeComponent: null,
      lastActiveComponant: null
    }
  },
  methods: {
    mylog(elem) {
      console.log(elem);
    },
    swichActiveComponent(newComponent) {
      this.lastActiveComponant = this.activeComponent;
      this.lastActiveComponant === newComponent ? this.activeComponent = null : this.activeComponent = newComponent
    },
  }
}
</script>

<style scoped>

.cardsWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cards {
  margin-bottom: 10px;
}

.categoryButtons {
  display:flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
}

.categoryButton {
  margin-right:10px;
}

.categoryButtonLast {
  margin-right: 0;
}

.regionCards {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width:280px;
}

.regionIcons {
  height: 50px;
}

</style>