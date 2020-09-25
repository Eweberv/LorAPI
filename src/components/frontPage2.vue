<template>
  <div>
    <p>Bienvenue sur la front page numéro 2</p>

    <div class="categoryButtons">
      <v-btn class="categoryButton" depressed color="primary">vocab terms</v-btn>
      <v-btn class="categoryButton categoryButtonLast" depressed color="primary">keywords</v-btn>
    </div>

    <p v-for="item in globalInfo.vocabTerms" :key="item.id">
      <v-card id="keywordCards" max-width="500px">
        <v-card-title>{{item.name}}</v-card-title>
        <v-card-subtitle>{{item.description}}</v-card-subtitle>
      </v-card>
    </p>

    <!--<p>{{globalInfo.keywords}}</p>-->
    <router-link to="/">Go to frontPage</router-link>
  </div>
</template>

<script>
import globalInfo from '../assets/globalInfo.json'

export default {
  name: "frontPage2",
  components: {
  },
  data: function() {
    return {
      globalInfo: globalInfo
    }
  }
}
</script>

<style scoped>

#keywordCards {
  margin-bottom: 10px;
}

.categoryButtons {
  margin: 20px;
}

.categoryButton {
  margin-right:10px;
}

.categoryButtonLast {
  margin-right: 0;
}

</style>