<template>
  <div>
    Judul:
    {{ detailTodo.title }}
    <div>
      Descripsi :
      {{ detailTodo.description }}
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    detailTodo() {
      return this.$store.state.listTodo.find((value, index) => index === this.$route.params.index);
    },
    //Kalau Di Refresh masih ilang
  },
};
</script>
