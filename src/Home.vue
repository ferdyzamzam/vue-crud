<template>
  <div>
    <div class="container marginTop">
      <h4>Data COVID-19</h4>
      <div class="alert alert-primary" role="alert">
        <h5 class="alert-heading">Pembaharuan!</h5>
        <hr />
        <p class="mb-0">
          Data ini di perbaharui pada:
          <strong>{{ allCovid.lastUpdate }}</strong>
        </p>
      </div>
    </div>
    <form class="container">
      <div class="form-group row">
        <div class="col-md-12">
          <label for="selectCountry">
            <b>Negara</b>
          </label>
          <select
            class="form-control col-6 col-md-8"
            v-model="country"
            @change="getCovidById"
            id="selectCountry"
          >
            <option value>-- Pilih negara --</option>
            <option
              v-for="data in countries"
              :key="data.iso2"
              v-bind:value="data.iso2"
            >
              {{ data.name }} - {{ data.iso2 }}
            </option>
          </select>
        </div>
        <div class="col-3 col-md-1">
          <span class="badge badge-secondary" @click="reset">
            <!-- <i class="fa fa-window-close"></i> -->
            Reset
          </span>
        </div>
      </div>
    </form>
    <br />
    <div class="container" v-if="selectCountry.confirmed == ''">
      <h4>Total Data</h4>
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-info">
              Terkonfirmasi
              <i class="fa fa-check-square"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ allCovid.confirmed }}</h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-success">
              Sembuh
              <i class="fa fa-retweet"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ allCovid.recovered }}</h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-danger">
              Meninggal
              <i class="fa fa-ambulance"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ allCovid.deaths }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-if="selectCountry.confirmed != ''">
      <div class="row">
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-info">
              Terkonfirmasi
              <i class="fa fa-check-square"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ selectCountry.confirmed }}</h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-success">
              Sembuh
              <i class="fa fa-retweet"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ selectCountry.recovered }}</h3>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="card text-center">
            <div class="card-header text-light bg-danger">
              Meninggal
              <i class="fa fa-ambulance"></i>
            </div>
            <div class="card-body">
              <h3 class="card-title">{{ selectCountry.deaths }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <h4>Tampilkan Data</h4>
      <div class="row">
        <div class="col-6 col-md-6">
          <button class="btn btn-primary" @click="showAll" v-if="!getAll">
            Se-dunia
          </button>
          <i v-if="getAll">Tunggu bentar...</i>
        </div>
        <div class="col-6 col-md-6">
          <button
            class="btn btn-warning text-light"
            @click="showByProvinsiIndo"
            v-if="!getByProv"
          >
            Indonesia Saja
          </button>
          <i v-if="getByProv">Tunggu bentar...</i>
        </div>
      </div>
    </div> -->

    <div class="container" v-if="allData.length != ''">
      <div class="table table-responsive">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th>NEGARA</th>
              <th>TERKONFIRMASI</th>
              <th>SEMBUH</th>
              <th>MENINGGAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="all in allData" :key="all.attributes.OBJECTID">
              <td>
                <b>{{ all.attributes.Country_Region }}</b>
              </td>
              <td>{{ all.attributes.Confirmed }}</td>
              <td>{{ all.attributes.Recovered }}</td>
              <td>{{ all.attributes.Deaths }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container" v-if="byProv.length != 0">
      <div class="table table-responsive">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th>PROVINSI</th>
              <th>TERKONFIRMASI</th>
              <th>SEMBUH</th>
              <th>MENINGGAL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prov in byProv" :key="prov.attributes.FID">
              <td>
                <b>{{ prov.attributes.Provinsi }}</b>
              </td>
              <td>{{ prov.attributes.Kasus_Posi }}</td>
              <td>{{ prov.attributes.Kasus_Semb }}</td>
              <td>{{ prov.attributes.Kasus_Meni }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <Footer></Footer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {
    Footer: () => import("@/components/Footer.vue"),
  },
  data() {
    return {
      apiURL: "https://covid19.mathdro.id/api/",
      apiURL2: "https://api.kawalcorona.com/indonesia/",

      allCovid: {
        confirmed: "",
        recovered: "",
        deaths: "",
        lastUpdate: "",
      },

      index: null,
      countries: [],

      country: "",

      selectCountry: {
        confirmed: "",
        recovered: "",
        deaths: "",
      },

      allData: [],

      byProv: [],

      getAll: false,
      getByProv: false,
    };
  },

  mounted() {
    this.getAllCovid();
    this.getCountries();
  },
  methods: {
    getAllCovid() {
      axios.get(this.apiURL).then((response) => {
        this.allCovid.confirmed = response.data.confirmed.value;
        this.allCovid.recovered = response.data.recovered.value;
        this.allCovid.deaths = response.data.deaths.value;
        this.allCovid.lastUpdate = response.data.lastUpdate.value;
      });
    },

    getCountries() {
      axios.get(this.apiURL + "countries").then((response) => {
        this.countries = response.data.countries;
      });
    },

    getCovidById() {
      if (this.country == "") {
        this.reset();
      } else {
        axios.get(this.apiURL + "countries/" + this.country).then(
          (response) => {
            this.selectCountry.confirmed = response.data.confirmed.value;
            this.selectCountry.recovered = response.data.recovered.value;
            this.selectCountry.deaths = response.data.deaths.value;
          },
          (error) => {
            if (error.res) {
              alert("Data Not Found");
              this.reset();
            }
          }
        );
      }
    },

    reset() {
      this.selectCountry.confirmed = "";
      this.country = "";
      this.getAllCovid();
    },

    showAll() {
      this.getAll = true;
      this.byProv = [];
      axios.get(this.apiURL2).then(
        (response) => {
          this.getAll = false;
          this.allData = response.data;
        },
        (error) => {
          this.getAll = false;
          if (error.res) {
            alert("Data Not Found");
            location.reload();
          }
        }
      );
    },

    showByProvinsiIndo() {
      this.getByProv = true;
      this.allData = [];
      axios.get("https://api.kawalcorona.com/indonesia/provinsi/").then(
        (response) => {
          this.getByProv = false;
          this.byProv = response.data;
        },
        console.log(this.allData),
        (error) => {
          this.getByProv = false;
          if (error.res) {
            alert("Data Not Found");
            location.reload();
          }
        }
      );
    },
  },
};
</script>
<style>
body {
  background-color: #fff;
}
.marginTop {
  margin-top: 34px;
}

.col-md-4,
.col-6 {
  margin-bottom: 20px;
}

table {
  font-family: monospace;
}

.badge {
  padding: 8px 10px 8px 10px;
  margin-top: 4px;
  cursor: pointer;
}
</style>