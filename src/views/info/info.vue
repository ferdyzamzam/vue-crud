<template>
  <div class="container-fluid py-3">
    <div class="row row-cols-2 row-cols-md-6 g-4">
      <div class="col" v-for="info in infos" :key="info.key">
        <div class="card shadow">
          <img v-bind:src="info.url_image" class="card-img-top" alt="" />
          <div class="card-body">
            <h6 class="card-title">{{ info.judul }}</h6>
            <p class="card-text"></p>
            <button
              class="btn btn-sm btn-primary float-right"
              @click="showinfo(info.key)"
            >
              selengkapnya...
            </button>
          </div>
          <div class="card-footer">
            <small class="text-muted">{{ info.tanggal }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import router from "@/router";

export default {
  data() {
    return {
      infos: [],
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
  },

  created() {
    this.ifo.onSnapshot((querySnapshot) => {
      this.infos = [];
      querySnapshot.forEach((ifo) => {
        this.infos.push({
          key: ifo.id,
          judul: ifo.data().judul,
          des: ifo.data().des,
          tanggal: ifo.data().tanggal,
          url_image: ifo.data().url_image,
        });
      });
    });
  },
};
</script>
