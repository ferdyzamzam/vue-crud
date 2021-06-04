<template>
  <div class="container py-3">
    <div class="row row-cols-2 row-cols-md-4 g-4">
      <div
        class="col"
        v-for="(info, index) in infos"
        v-bind:key="index + '-info'"
      >
        <div class="card shadow">
          <img v-bind:src="info.url_image" class="card-img-top" alt="gambar" />
          <div class="card-body">
            <h6 class="card-title">{{ info.judul }}</h6>
            <!-- <button
              class="btn btn-sm btn-primary float-right"
              @click="showinfo(info.key)"
            >
              selengkapnya...
            </button> -->
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ info.tanggal }}</small>
          </div>
        </div>
      </div>
    </div>
    <InfiniteLoading @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>
<script>
import firebase from "firebase";
import InfiniteLoading from "vue-infinite-loading";
import router from "@/router";

export default {
  components: {
    InfiniteLoading,
  },
  name: "info",
  data() {
    return {
      infos: [],
      lastDocSnapshot: null,
      ifo: firebase.firestore().collection("infos"),
    };
  },

  methods: {
    showinfo(infos) {
      console.log(infos);
      router.push({
        name: "info_show",
        params: {
          id: infos,
        },
      });
    },

    async fetchInfos() {
      const db = firebase.firestore();
      let infosRef = db.collection("infos").limit(4);
      console.log(infosRef);
      if (this.lastDocSnapshot) {
        infosRef = infosRef.startAfter(this.lastDocSnapshot);
      }
      const infosSnap = await infosRef.get();
      this.lastDocSnapshot = infosSnap.docs[infosSnap.docs.length - 1];
      const result = infosSnap.docs.map((p) => p.data());
      this.infos.push(...result);
      return result.length;
    },

    async infiniteHandler($state) {
      const newInfosCount = await this.fetchInfos();

      if (newInfosCount > 0) {
        return $state.loaded();
      }

      return $state.complete();
    },
  },

  // methods: {
  //   showinfo(infos) {
  //     console.log(infos);
  //     router.push({
  //       name: "info_show",
  //       params: {
  //         id: infos,
  //       },
  //     });
  //   },
  // },
  // created() {
  //   this.ifo.onSnapshot((querySnapshot) => {
  //     this.infos = [];
  //     querySnapshot.forEach((ifo) => {
  //       this.infos.push({
  //         key: ifo.id,
  //         judul: ifo.data().judul,
  //         des: ifo.data().des,
  //         tanggal: ifo.data().tanggal,
  //         url_image: ifo.data().url_image,
  //       });
  //     });
  //   });
  // },
};
</script>
