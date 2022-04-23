import Vue from "vue";
import Vuex from "vuex";
import CreatePerState from "vuex-persistedstate";

Vue.use(Vuex);
const persisted = CreatePerState({
  state: ["listTodo", "editedTodo", "desc"],
});

export default new Vuex.Store({
  plugins: [persisted],
  state: {
    editedTodo: "",
    listTodo: [],
    desc: "",
  },
  getters: {},
  mutations: {
    setHapus(state, param) {
      state.listTodo = state.listTodo.filter((item, id) => id != param);
    },
    setNewTodo(state, param) {
      state.editedTodo = param;
    },
    setEdit(state, index) {
      if (state.editedTodo != "") {
        state.listTodo.map((item, id) =>
          id === index
            ? Vue.set(state.listTodo, id, {
                title: state.editedTodo,
                description: state.listTodo[id].desc,
              })
            : ""
        );
      } else {
        alert("tidak boleh kosong");
      }
    },
    setLists(state, param) {
      if (param === "") {
        alert("Please insert data");
      } else {
        state.listTodo.push({
          title: param,
          description: "not found",
        });
      }
    },
    setEditDesc(state, index) {
      if (state.desc != "") {
        state.listTodo.map((item, id) =>
          id === index
            ? Vue.set(state.listTodo, id, {
                title: state.listTodo[id].title,
                description: state.desc,
              })
            : ""
        );
      } else {
        alert("deskripsi harus diisi");
      }
    },
    setNewDesc(state, param) {
      state.desc = param;
    },
  },
  actions: {
    tambahTodo(store, todo) {
      store.commit("setLists", todo);
    },
    hapusTodo(store, index) {
      store.commit("setHapus", index);
    },
    updateTodo(store, value) {
      store.commit("setNewTodo", value);
    },
    editTodo(store, index) {
      store.commit("setEdit", index);
    },
    editDesc(store, index) {
      store.commit("setEditDesc", index);
    },
    updateDesc(store, value) {
      store.commit("setNewDesc", value);
    },
  },
  modules: {},
});
