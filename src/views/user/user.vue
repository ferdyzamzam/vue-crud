<template>
  <div class="container">
    <br />
    <div class="row">
      <div class="col-md-8">
        <center>
          <h3>User</h3>
        </center>
        <input type="text" v-model="search" placeholder="Cari..." />
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th scope="col">username</th>
              <th scope="col">Email</th>
              <th scope="col">Tanggal</th>
              <th scope="col">opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredusers" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.tanggal }}</td>
              <td>
                <router-link
                  :to="{ name: 'edit_user', params: { id: user.key } }"
                  class="btn btn-sm btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Edit
                </router-link>
                |
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
      <div class="col-md-4">
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
      search: "",
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
    filteredusers: function () {
      return this.users.filter((user) => {
        return user.username.match(this.search);
      });
    },
  },
};
</script>
