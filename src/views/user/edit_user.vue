<template>
  <div class="container">
    <br />
    <div class="col-5">
      <div class="card">
        <div class="card-header">Edit</div>
        <div class="card-body">
          <form @submit.prevent="onUpdateForm">
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
                type="text"
                class="form-control"
                v-model="user.email"
                required
              />
            </div>
            <div class="form-group">
              <label>Tanggal</label>
              <input
                type="Date"
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
  </div>
</template>
<script>
import { db } from "@/Firebase";

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    let dbRef = db.collection("users").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.user = doc.data();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("users")
        .doc(this.$route.params.id)
        .update(this.user)
        .then(() => {
          console.log("Data Berhasil Di update!");
          this.$router.push("/user");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>