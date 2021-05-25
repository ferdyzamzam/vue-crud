<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Tambah Info</h5>
        <hr />

        <div class="form-group">
          <label>Judul</label>
          <input type="text" class="form-control" v-model="info.judul" />
        </div>
        <br />
        <div class="form-group">
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              v-model="info.des"
            ></textarea>
            <label for="floatingTextarea">Deskripsi</label>
          </div>
        </div>
        <br />
        <div class="form-group">
          <label>Tanggal</label>
          <input
            type="date"
            id="tanggal"
            class="form-control"
            v-model="info.tanggal"
          />
        </div>
        <br />
        <div class="form-group">
          <label>Gambar</label>
          <input
            type="file"
            class="form-control"
            accept="image/*"
            @change="image"
          />
        </div>
        <br />
        <div class="form-group">
          <button class="btn btn-sm btn-success float-right" @click="save">
            Simpan
          </button>
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
      fo: firebase.firestore().collection("infos"),
      info: {
        judul: "",
        des: "",
        tanggal: new Date().toISOString().substr(0, 10),
        url_image: "",
      },
      imageData: null,
    };
  },
  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
    },
    save() {
      console.log(this.info);

      var storageRef = firebase
        .storage()
        .ref("gambar/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
      storageRef.put(this.imageData).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(this.info);
          this.info.url_image = downloadURL;
          this.fo.add(this.info).then(() => {
            console.log(downloadURL);
            window.setTimeout(() => {
              router.push({
                name: "info",
              });
            }, 1500);
          });
        });
      });
    },
  },
};
</script>
