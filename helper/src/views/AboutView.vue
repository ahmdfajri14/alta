<template>
  <div class="about">
    <h1>Ini adalah halaman Detail</h1>
    <TodoDesc />
  </div>
</template>
<script>
// @ is an alias to /src
import TodoDesc from "@/components/TodoDesc.vue";

export default {
  name: "AboutView",
  components: {
    TodoDesc,
  },
};
</script>
