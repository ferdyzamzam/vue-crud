<template>
  <div class="container mt-4">
    <h4>
      Data Info
      <router-link class="btn btn-sm btn-primary" to="/info/create"
        >Tambah</router-link
      >
    </h4>
    <div class="col">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Judul</th>
              <th scope="col">Tanggal</th>
              <td scope="col">Gambar</td>
              <td scope="col">opsi</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(info, index) in infos" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ info.judul }}</td>
              <td>{{ info.tanggal }}</td>
              <td>
                <img
                  v-bind:src="info.url_image"
                  class="card-img-top"
                  style="width: 50px"
                  alt="Gambar"
                />
              </td>
              <td>
                <router-link
                  :to="{ name: 'info_edit', params: { id: info.key } }"
                  class="btn btn-sm btn-primary"
                >
                  Edit
                </router-link>
                <button
                  @click.prevent="deleteSiswa(info.key)"
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
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      infos: [],
      fo: firebase.firestore().collection("infos"),
    };
  },

  created() {
    this.fo.onSnapshot((querySnapshot) => {
      this.infos = [];
      querySnapshot.forEach((fo) => {
        this.infos.push({
          key: fo.id,
          judul: fo.data().judul,
          des: fo.data().des,
          tanggal: fo.data().tanggal,
          url_image: fo.data().url_image,
        });
      });
    });
  },
};
</script>
