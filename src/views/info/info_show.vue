<template>
  <div class="container mt-4">
    <div class="card mb-3">
      <img v-bind:src="info.url_image" class="card-img-top" alt="Gambar" />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ info.judul }}</h5>
      <p class="card-text" style="font-size: 12px">{{ info.des }}</p>
      <hr />
      <p class="card-text">
        <small class="text-muted">{{ info.tanggal }}</small>
      </p>
    </div>
    <router-link to="/info" class="btn btn-sm">Kembali</router-link>
  </div>
</template>
<script>
import firebase from "firebase";
// import router from "../../../router";

export default {
  data() {
    return {
      key: this.$route.params.id,
      info: {
        judul: "",
        des: "",
        tanggal: "",
        url_image: "",
      },
      imageData: null,
    };
  },

  created() {
    const ref = firebase
      .firestore()
      .collection("infos")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      this.key = doc.id;
      this.info = doc.data();
    });
  },
};
</script>
