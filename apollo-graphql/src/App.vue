<template>
  <div id="app">
   <h1>GraphQl Apollo</h1>
   <button @click="clickAll">Cek Anggota</button>
  <ul>
    <li v-for="(anggota, id) in listAnggota" :key="id" > {{anggota.nama}} </li>
  </ul>
  </div>
</template>

<script>
import { GET_ANGGOTA_QUERY } from './constants/graphql'

export default {
  name: 'App',
  data () {
    return {
      listAnggota: [],
    }
  },
  // apollo: {
  // // Simple query that will update the 'hello' vue property
  // listAnggota: {
  //     query: GET_ANGGOTA_QUERY,
  //   update: data =>  data.anggota
  // }
  // },
// async mounted () {
  
// }
methods: {
  clickAll() {
    this.$apollo.query({ query: GET_ANGGOTA_QUERY })
      .then((response) => {
       this.listAnggota = response.data.anggota
      });
  }
}
}
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
