<template>
  <div>
    <h1>My Todo List</h1>
    <div>
      <form @submit.prevent="OnSubmit">
        <input v-model="search" name="todo" placeholder="masukkan id" />
        <button @click="clickSearchById">Search by id</button>
      </form>
    </div>
    <div class="todo-list">
      <ul>
        <li v-for="(todo, index) in Alltodos" :key="index" class="todo">
          <div class="content">
            <h3>{{ todo.text }}</h3>
          </div>
          <div class="content">
            <i class="far fa-times-circle fa-2x" @click="Completed(index)"></i>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="Alltodos.length > 0" class="todo-form">
      <div>
        <input v-model="newTodo" placeholder="Tambah To Do" />
        <button @click="addTodo">Tambahkan</button>
      </div>
      <div>
        <input v-model="todoDelete" placeholder="Hapus To Do" />
        <button @click="deleteTodo">Hapus</button>
      </div>
      <div>
        <input v-model="firstTodo" placeholder="To Do yang mau di edit" />
        <input v-model="secondTodo" placeholder="Tulis To Do editnya" />
        <button @click="editTodo">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { GET_LIST_TODO } from "./constants/graphql";
import gql from "graphql-tag";

export default {
  name: "ToDo",
  data() {
    return {
      Alltodos: [],
      search: null,
      newTodo: "",
      todoDelete: "",
      firstTodo: "",
      secondTodo: "",
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    Alltodos: {
      query: gql`
        query {
          todolist_todo {
            id
            text
            is_done
          }
        }
      `,
      update: (data) => data.todolist_todo,
      subscribeToMore: {
        document: gql(`
    subscription {
         todolist_todo {
            id
            text
            is_done
          }
    }
        `),
        updateQuery: (prev, { subscriptionData }) => {
          return {
            todolist_todo: subscriptionData.data.todolist_todo,
          };
        },
      },
    },
  },
  methods: {
    async addTodo() {
      console.log("todo nambah");
      await this.$apollo.mutate({
        mutation: gql`
                mutation {
  insert_todolist_todo(objects: { text: ${this.newTodo}}) {
    returning {
      id
      text
      is_done
    }
  }
}
      `,
        variables: {},
      });
    },

    async deleteTodo() {
      await this.$apollo.mutate({
        mutation: gql`
  mutation {
    delete_todolist_todo(where: {text: {_eq: "${this.todoDelete}"}}) {
    returning {
      id
      text
  is_done
    }
  }
  }
`,
        variables: {},
      });
    },
    async editTodo() {
      await this.$apollo.mutate({
        mutation: gql`
  mutation {
  update_todolist_todo(where: {text: {_eq: "${this.firstTodo}"}}, _set: {text: "${this.secondTodo}"}) {
    returning {
      text
    }
  }
}
`,
        variables: {},
      });
    },
    clickSearchById() {
      this.$apollo
        .query({
          query: gql`
        query {
          todolist_todo (where: {id: {_eq: ${this.search}}}) {
            id
            text
            is_done
          }
        }
      `,
        })
        .then((response) => {
          console.log(response, "cek response");
          this.Alltodos = response.data.todolist_todo;
        });
    },
  },
};
</script>

<style  scoped>
body {
  padding-top: 1em;
  padding-bottom: 1em;
}
input {
  display: block;
  margin: auto;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: groove;
  outline: none;
  font-size: 1.3em;
  padding: 15px 0;
  text-align: center;
}
.todo-form {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.todo {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
button {
  margin-top: 10px;
  padding: 10px;
  background-color: rgb(180, 199, 211);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
  outline: none;
}

h3 {
  margin: 0px;
  padding: 0px;
}
li {
  list-style-type: none;
  width: 50%;
  margin: auto;
  padding: 15px 0;
  background-color: rgb(216, 216, 216);
}
.content {
  flex: 1;
}
i {
  cursor: pointer;
  color: red;
}
</style>
