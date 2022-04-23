<template>
  <div>
    <ol>
      <ItemList v-for="(Todo, index) in todoList" :key="index" :todo="Todo" :index="index" @edit-todo="editTodo" @update-todo="updateTodo" @hapus-todo="hapusTodo" />
    </ol>
    <input type="text" v-model="Todo" />
    <button @click="addTodo()">Tambahkan</button>
  </div>
</template>
<script>
import ItemList from "@/components/ItemList.vue";
export default {
  name: "TodoList",
  components: {
    ItemList,
  },
  data() {
    return {
      Todo: "",
    };
  },
  computed: {
    todoList() {
      return this.$store.state.listTodo;
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch("tambahTodo", this.Todo);
      this.Todo = "";
    },
    hapusTodo(index) {
      this.$store.dispatch("hapusTodo", index);
    },
    updateTodo(value) {
      this.$store.dispatch("updateTodo", value);
    },
    editTodo(index) {
      this.$store.dispatch("editTodo", index);
    },
  },
};
</script>
