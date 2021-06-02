<template>
  <div>
    <div class="container mt-4">
      <center>
        <h4>Categories Quotes API</h4>
      </center>
      <div class="row row-cols-2 row-cols-md-4 g-4">
        <div class="col" v-for="(quote, index) in quotes" :key="quote.id">
          <div class="card shadow">
            <img
              v-bind:src="quotesurl.baseurl + quotes[index].background"
              class="card-img-top"
              alt=""
            />
            <div class="card-body">
              <h6 class="card-title">{{ quotes[index].name }}</h6>
              <p class="card-text">{{ quotes[index].title }}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">
                <a :href="quotes1.url" target="_blank">{{ quotes1.url }} </a>
                || {{ quotes1.year }}</small
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <Footer></Footer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {
    Footer: () => import("@/components/Footer.vue"),
  },
  data() {
    return {
      quotes: [],
    };
  },

  // mounted() {
  //   axios
  //     .get("https://quotes.rest/qod/categories?language=en&detailed=true")
  //     .then((response) => (this.quotes = response));

  //   console.log(this.quotes.contents.categories);
  // },
  async mounted() {
    const response = await axios.get(
      "https://quotes.rest/qod/categories?language=en&detailed=true"
    );

    this.quotes = response.data.contents.categories;
    this.quotes1 = response.data.copyright;
    this.quotesurl = response.data;

    console.log(this.quotesurl);
  },
};
</script>
