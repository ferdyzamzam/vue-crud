<template>
  <div class="container">
    <div class="row">
      <div class="col mt-4">
        <div class="card">
          <div class="card-body">
            <h3>Tambah</h3>
            <form @submit.prevent="onFormSubmit">
              <div class="form-group">
                <label>Username</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="user.username"
                  required
                />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="user.email"
                  required
                />
              </div>
              <div class="form-group">
                <label>Tanggal</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="user.tanggal"
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
      <div class="col mt-4">
        <div class="card">
          <div class="card-body">
            <input type="text" v-model="search" placeholder="Cari..." />
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Opsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in resultsearch" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.tanggal }}</td>
                    <td>
                      <router-link
                        :to="{ name: 'edit_user', params: { id: user.key } }"
                        class="btn btn-sm btn-primary"
                      >
                        Edit
                      </router-link>
                      <button
                        @click.prevent="deleteSiswa(user.key)"
                        class="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      users: [],
      user: {},
      loading: false,
      search: null,
    };
  },

  created() {
    db.collection("users").onSnapshot((snapshotChange) => {
      this.users = [];
      snapshotChange.forEach((doc) => {
        this.users.push({
          key: doc.id,
          username: doc.data().username,
          email: doc.data().email,
          tanggal: doc.data().tanggal,
        });
      });
    });
  },
  methods: {
    deleteSiswa(id) {
      if (window.confirm("Apakah Anda Yakin Ingin Menghapus Data Ini?")) {
        db.collection("users")
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
      db.collection("users")
        .add(this.user)
        .then(() => {
          this.user.username = "";
          this.user.email = "";
          this.user.tanggal = "";
          router.push({
            name: "user",
          });
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    resultsearch() {
      if (this.search) {
        return this.users.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.username.toLowerCase().includes(v));
        });
      } else {
        return this.users;
      }
    },
  },
};
</script>
