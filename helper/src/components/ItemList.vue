<template>
  <li>
    <label v-if="!isEdit" @click="nextPage(index)">
      {{ todo.title }}
    </label>
    <label v-if="isEdit">
      <input type="text" v-model="inputEdit" />
    </label>
    <button @click="hapusTodo(index)">Hapus</button>

    <button v-if="!isEdit" @click="editTodo">Edit</button>
    <button v-if="isEdit" @click="editList(index)">Update</button>
  </li>
</template>
<script>
export default {
  name: "ItemList",
  data() {
    return {
      isEdit: false,
      inputEdit: "",
    };
  },
  mounted() {
    this.inputEdit = this.todo.title;
  },
  watch: {
    todo(value) {
      this.inputEdit = value.title;
    },
  },
  props: {
    todo: Object,
    index: Number,
  },
  methods: {
    hapusTodo(index) {
      this.$emit("hapus-todo", index);
    },
    editTodo() {
      this.isEdit = !this.isEdit;
    },
    updateTodo() {
      this.$emit("update-todo", this.inputEdit);
      this.editTodo();
    },
    editList(index) {
      this.updateTodo();
      this.$emit("edit-todo", index);
    },
    nextPage(index) {
      this.$router.push({
        name: "detail",
        params: { index: index },
      });
    },
  },
};
</script>
