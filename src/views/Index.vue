<template>
  <div class="container">
    <br />
    <div class="row">
      <div class="col-md-8">
        <center>
          <h3>Siswa</h3>
        </center>
        <input type="text" v-model="search" placeholder="Cari..." />
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">Name</th>
              <th scope="col">Kelas</th>
              <th scope="col">Umur</th>
              <th scope="col">opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(siswa, index) in filteredsiswas" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ siswa.nama }}</td>
              <td>{{ siswa.kelas }}</td>
              <td>{{ siswa.umur }}</td>
              <td>
                <router-link
                  :to="{ name: 'edit', params: { id: siswa.key } }"
                  class="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Edit
                </router-link>
                |
                <button
                  @click.prevent="deleteSiswa(siswa.key)"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-4">
        <h3>Tambah</h3>
        <form @submit.prevent="onFormSubmit">
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
</template>
<script>
import { db } from "@/Firebase";
import router from "@/router";

export default {
  data() {
    return {
      siswas: [],
      search: "",
      siswa: {},
      loading: false,
    };
  },
  computed: {
    filteredsiswas: function () {
      return this.siswas.filter((siswa) => {
        return siswa.nama.match(this.search);
      });
    },
  },
  created() {
    db.collection("siswas").onSnapshot((snapshotChange) => {
      this.siswas = [];
      snapshotChange.forEach((doc) => {
        this.siswas.push({
          key: doc.id,
          nama: doc.data().nama,
          kelas: doc.data().kelas,
          umur: doc.data().umur,
        });
      });
    });
  },
  methods: {
    deleteSiswa(id) {
      if (window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?")) {
        db.collection("siswas")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Data Terhapus!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    onFormSubmit(event) {
      this.loading = true;
      event.preventDefault();
      db.collection("siswas")
        .add(this.siswa)
        .then(() => {
          this.siswa.nama = "";
          this.siswa.kelas = "";
          this.siswa.umur = "";
          router.push({
            name: "index",
          });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
