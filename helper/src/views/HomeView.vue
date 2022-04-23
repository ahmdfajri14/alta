<template>
  <div class="home">
    <h1>Todo List</h1>
    <TodoList />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoList from "@/components/TodoList.vue";

export default {
  name: "HomeView",
  components: {
    TodoList,
  },
};
</script>
