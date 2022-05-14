<template>
  <div id="app">
    <h1>GraphQl Apollo</h1>
    <input v-model="namaSebelum" placeholder="Input Nama Yang Mau Diubah" />
    <input
      v-model="nama"
      @keyup.enter="TAMBAH_ANGGOTA(nama)"
      placeholder="Input Nama Pengganti"
    />
    <button @click="editAnggota">Edit Anggota</button>
    <!-- <button @click="clickAll">Cek Anggota</button> -->
    <ul>
      <li v-for="(anggota, id) in listAnggota" :key="id">{{ anggota.nama }}</li>
    </ul>
  </div>
</template>

<script>
import { GET_ANGGOTA_QUERY } from "./constants/graphql";
import gql from "graphql-tag";

export default {
  name: "App",
  data() {
    return {
      nama: "",
      namaSebelum: "",
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    listAnggota: {
      query: GET_ANGGOTA_QUERY,
      update: (data) => data.anggota,
      subscribeToMore: {
        document: gql(`
               subscription {
  anggota {
    nama
    id
  }
}
          `),
        updateQuery: (prev, { subscriptionData }) => {
          return {
            anggota: subscriptionData.data.anggota,
          };
        },
      },
    },
  },
  async mounted() {},
  methods: {
    async TAMBAH_ANGGOTA(value) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation ($value: String) {
            insert_anggota(objects: { nama: $value }) {
              returning {
                id
                nama
              }
            }
          }
        `,
        variables: {
          value,
        },
      });
    },
    async addAnggota() {
      await this.$apollo.mutate({
        mutation: gql`
  mutation {
    insert_anggota(objects: {nama: ${this.nama}}) {
      returning {
        id
        nama
      }
    }
  }
`,
        variables: {},
      });
    },
    async deleteAnggota() {
      await this.$apollo.mutate({
        mutation: gql`
  mutation {
    delete_anggota(where: {nama: {_eq: "${this.nama}"}}) {
    returning {
      nama
      id
    }
  }
  }
`,
        variables: {},
      });
    },
    async editAnggota() {
      await this.$apollo.mutate({
        mutation: gql`
  mutation MyMutation {
  update_anggota(where: {nama: {_eq: "${this.namaSebelum}"}}, _set: {nama: "${this.nama}"}) {
    returning {
      id
      nama
    }
  }
}
`,
        variables: {},
      });
    },
    // clickAll() {
    //   this.$apollo.query({ query: GET_ANGGOTA_QUERY }).then((response) => {
    //     this.listAnggota = response.data.anggota;
    //   });
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>