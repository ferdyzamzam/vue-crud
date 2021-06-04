<template>
  <div class="container mt-4">
    <h4>Quotes</h4>
    <div class="card">
      <div v-for="(qod, index) in qods" :key="index" class="card-body">
        Quote: {{ qods[index].quote }}
        <br />
        Category: {{ qods[index].category }}
        <br />
        Author: {{ qods[index].author }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      qods: [],
    };
  },

  mounted() {
    let param = this.$route.params.quote;

    axios
      .get(`https://quotes.rest/qod?category=${param}&language=en`)
      .then((res) => {
        this.qods = res.data.contents.quotes;
        console.log(this.qods);
      });
  },
  // methods: {
  //   getCategories() {
  //     axios
  //       .get("https://quotes.rest/qod/categories?language=en&detailed=true")
  //       .then((response) => {
  //         this.category = response.data.contents.categories.name;
  //       });
  //   },
  //   getData() {
  //     axios
  //       .get("https://quotes.rest/qod?category=" + this.category)
  //       .then((response) => {
  //         this.qods = response.data.contents.quotes;
  //         console.log(this.qods);
  //       });
  //   },
  // },
};
</script>
