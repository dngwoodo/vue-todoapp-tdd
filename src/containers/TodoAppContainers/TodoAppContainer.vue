<template>
  <todo-app
    :todo="todo"
    :onChange="handleChange"
    :todos="todos"
    :onClickAddTodo="handleClickAddTodo"
    :onClickDeleteTodo="handleClickDeleteTodo"
    :onClickToggle="handleClickToggle"
  ></todo-app>
</template>

<script>
import TodoApp from "@/components/TodoApp/TodoApp.vue";

export default {
  components: { TodoApp },
  name: "TodoAppContainer",
  data() {
    return {
      todo: "",
      todos: [],
    };
  },
  methods: {
    handleChange(event) {
      this.todo = event.target.value;
    },
    handleClickAddTodo() {
      if (!this.todo.trim()) {
        return;
      }

      this.todos.push({
        id: +new Date(),
        text: this.todo,
        done: false,
      });
      this.todo = "";
    },
    handleClickDeleteTodo(todoId) {
      this.todos = this.todos.filter(({ id }) => id !== todoId);
    },
    handleClickToggle(todo) {
      todo.done = !todo.done;
    },
  },
};
</script>
