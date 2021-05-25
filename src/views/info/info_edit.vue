<template>
  <div class="container" style="padding: 10px">
    <div class="card">
      <div class="card-body">
        <h5>Ubah Info</h5>
        <hr />

        <div class="form-group">
          <label>Judul</label>
          <input type="text" class="form-control" v-model="info.judul" />
        </div>
        <br />
        <div class="form-group">
          <label>Tanggal</label>
          <input type="date" class="form-control" v-model="info.tanggal" />
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
        <div class="row">
          <div class="col-sm-3">
            <div class="text-center">Gambar</div>
            <center class="mt-2">
              <img v-bind:src="info.url_image" width="150px" alt="" />
            </center>
          </div>
          <div class="col-sm-9">
            <div class="form-group">
              <label>Gambar</label>
              <input
                type="file"
                class="form-control"
                accept="image/*"
                @change="image"
              />
            </div>
            <div class="form-group mt-2">
              <button class="btn btn-sm btn-success float-right" @click="save">
                Simpan
              </button>
            </div>
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

  mounted() {
    const ref = firebase
      .firestore()
      .collection("infos")
      .doc(this.$route.params.id);
    ref.get().then((doc) => {
      this.key = doc.id;
      this.info = doc.data();
    });
  },

  methods: {
    image(event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      // this.save();
    },
    save() {
      const updateRef = firebase
        .firestore()
        .collection("infos")
        .doc(this.$route.params.id);

      console.log(this.info);
      if (this.imageData != null) {
        let image_old = firebase.storage().refFromURL(this.info.url_image);
        console.log(image_old);
        image_old.delete().then(() => {
          console.log("Image terhapus!");
        });

        var storageRef = firebase
          .storage()
          .ref("gambar/" + "BER_" + Math.floor(10000 + Math.random() * 90000));
        storageRef.put(this.imageData).then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(this.info);

            this.info.url_image = downloadURL;
            updateRef
              .set(this.info)
              .then(() => {
                this.key = "";
                this.info.judul;
                this.info.des;
                this.info.tanggal;

                setTimeout(() => {
                  router.push({
                    name: "info",
                  });
                }, 1500);
              })
              .catch((error) => {
                alert("Error saat edit data, error: ", error);
              });
          });
        });
      } else {
        console.log(this.info);
        updateRef.set(this.info).then(() => {
          this.key = "";
          this.info.judul;
          this.info.des;
          this.info.tanggal;
          window.setTimeout(() => {
            router.push({
              name: "info",
            });
          }, 1500);
        });
      }
    },
  },
};
</script>