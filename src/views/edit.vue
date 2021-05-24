<template>
  <div class="container">
    <br />
    <div class="col-5">
      <div class="card">
        <div class="card-header">Edit</div>
        <div class="card-body">
          <form @submit.prevent="onUpdateForm">
            <div class="form-group">
              <label>Nama</label>
              <input
                type="text"
                class="form-control"
                v-model="siswa.nama"
                required
              />
            </div>
            <div class="form-group">
              <label>Kelas</label>
              <input
                type="text"
                class="form-control"
                v-model="siswa.kelas"
                required
              />
            </div>
            <div class="form-group">
              <label>Umur</label>
              <input
                type="number"
                class="form-control"
                v-model="siswa.umur"
                required
              />
            </div>
            <br />
            <div class="form-group">
              <button
                class="btn btn-success btn-block"
                type="button"
                v-if="loading"
              >
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              </button>
              <button class="btn btn-success btn-block" type="submit" v-else>
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/Firebase";

export default {
  data() {
    return {
      siswa: {},
    };
  },
  created() {
    let dbRef = db.collection("siswas").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.siswa = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("siswas")
        .doc(this.$route.params.id)
        .update(this.siswa)
        .then(() => {
          console.log("Data Berhasil Di update!");
          this.$router.push("/index");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>